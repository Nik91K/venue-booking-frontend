import { useState, useRef, useEffect } from 'react';
import LayoutPage from '@/layoutPage';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useAppSelector, useAppDispatch } from '@api/hooks';
import { updateCurrentUser } from '@api/slices/userSlice';
import { Camera, KeyRound, User, Clock, CalendarDays } from 'lucide-react';
import { getCurrentUserBookings } from '@api/slices/bookingSlice';
import BookingCard from '@components/common/cards/BookingCard';

const SettingsPage = () => {
  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector(state => state.users);
  const { bookings } = useAppSelector(state => state.booking);

  const [name, setName] = useState(user?.name ?? '');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleNameSave = () => {
    if (!name.trim()) return;
    dispatch(updateCurrentUser({ name }));
  };

  const handlePasswordSave = () => {
    if (!newPassword || newPassword !== confirmPassword) return;
    dispatch(updateCurrentUser({ password: newPassword } as any));
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleAvatarSave = () => {
    if (!avatarFile) return;
    const formData = new FormData();
    formData.append('avatar', avatarFile);
    dispatch(updateCurrentUser(formData));
  };

  useEffect(() => {
    if (!bookings || bookings.length === 0) {
      dispatch(getCurrentUserBookings());
    }
  }, [dispatch, bookings]);

  return (
    <LayoutPage>
      <div className="max-w-2xl mx-auto py-10 px-4">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your account and view your activity.
          </p>
        </div>

        <Tabs defaultValue="profile">
          <TabsList className="mb-6">
            <TabsTrigger value="profile" className="gap-2">
              <User className="size-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="history" className="gap-2">
              <Clock className="size-4" />
              Order History
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="profile"
            className="grid grid-cols-2 gap-4 [&>*:last-child:nth-child(odd)]:col-span-2"
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Avatar</CardTitle>
                <CardDescription>Update your profile picture.</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center gap-6">
                <div className="relative">
                  <Avatar className="size-20">
                    <AvatarImage
                      src={
                        avatarPreview ??
                        user?.avatarUrl ??
                        `https://api.dicebear.com/9.x/fun-emoji/svg?seed=${user?.avatarSeed}`
                      }
                    />
                    <AvatarFallback>{user?.name?.[0] ?? 'U'}</AvatarFallback>
                  </Avatar>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute -bottom-1 -right-1 rounded-full bg-primary p-1.5 text-primary-foreground shadow hover:opacity-90 transition-opacity"
                  >
                    <Camera className="size-3.5" />
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarChange}
                  />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">{user?.name}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                  {avatarFile && (
                    <Button
                      size="sm"
                      className="mt-2"
                      onClick={handleAvatarSave}
                      disabled={loading}
                    >
                      Save avatar
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Display Name</CardTitle>
                <CardDescription>
                  Change how your name appears across the app.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Your name"
                  />
                </div>
                <Button
                  onClick={handleNameSave}
                  disabled={loading || !name.trim() || name === user?.name}
                  size="sm"
                >
                  Save name
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <KeyRound className="size-4 text-muted-foreground" />
                  <CardTitle className="text-base">Password</CardTitle>
                </div>
                <CardDescription>
                  Choose a strong, unique password.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Separator />
                <div className="space-y-1.5">
                  <Label htmlFor="new-password">New password</Label>
                  <Input
                    id="new-password"
                    type="password"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="confirm-password">Confirm new password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                  />
                  {confirmPassword && newPassword !== confirmPassword && (
                    <p className="text-xs text-destructive">
                      Passwords do not match.
                    </p>
                  )}
                </div>
                <Button
                  onClick={handlePasswordSave}
                  disabled={
                    loading || !newPassword || newPassword !== confirmPassword
                  }
                  size="sm"
                >
                  Update password
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <CalendarDays className="size-4 text-muted-foreground" />
                  <CardTitle className="text-base">Order History</CardTitle>
                </div>
                <CardDescription>
                  All your past bookings in one place.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!bookings ? (
                  <div className="py-12 text-center text-sm text-muted-foreground">
                    No bookings yet.
                  </div>
                ) : (
                  bookings.map(booking => (
                    <BookingCard key={booking.id} booking={booking} />
                  ))
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </LayoutPage>
  );
};

export default SettingsPage;

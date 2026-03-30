import { useState, useRef, useEffect } from 'react';
import LayoutPage from '@/layoutPage';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@components/ui/card';
import { Button } from '@components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { useAppSelector, useAppDispatch } from '@api/hooks';
import { updateCurrentUser } from '@api/slices/userSlice';
import {
  Camera,
  User,
  Clock,
  CalendarDays,
  KeyRound,
  EyeOff,
  Eye,
} from 'lucide-react';
import { getCurrentUserBookings } from '@api/slices/bookingSlice';
import BookingCard from '@components/common/cards/BookingCard';
import CardComponent from '@components/common/cards/CardComponent';
import FormFieldGroup from '@components/common/FormFieldGroup';
import PasswordStrength from '@components/common/PasswordStrength';
import { validatePassword } from '@hooks/validation/authorization';
import { validateUsername } from '@hooks/validation/authorization';
import { addError } from '@api/slices/errorSlice';
import { Spinner } from '@components/ui/spinner';

const SettingsPage = () => {
  const dispatch = useAppDispatch();
  const { user, loading: userLoading } = useAppSelector(state => state.users);
  const {
    bookings,
    loading: bookingLoading,
    fetched,
  } = useAppSelector(state => state.booking);
  const [name, setName] = useState(user?.name ?? '');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

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
    if (!validateUsername(name)) {
      dispatch(
        addError({
          title: 'Vaildation error',
          message: 'Incorrect username',
          type: 'error',
        })
      );
      return;
    }
    dispatch(updateCurrentUser({ name }));
  };

  const handlePasswordSave = () => {
    if (!validatePassword(newPassword) || newPassword !== confirmPassword) {
      dispatch(
        addError({
          title: 'Vaildation error',
          message: 'Incorrect password',
          type: 'error',
        })
      );
      return;
    }
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
    if (!fetched) {
      dispatch(getCurrentUserBookings());
    }
  }, [dispatch, bookings]);

  return (
    <LayoutPage>
      <div className="max-w-4xl mx-auto py-10 px-4">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your account and view your activity.
          </p>
        </div>

        <Tabs defaultValue="profile">
          <TabsList className="mb-6 w-full">
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
            <CardComponent
              title="Avatar"
              subTitle="Update your profile picture."
            >
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
                    disabled={userLoading}
                  >
                    Save avatar
                  </Button>
                )}
              </div>
            </CardComponent>
            <CardComponent
              title="Display Name"
              subTitle="Change how your name."
            >
              <FormFieldGroup
                value={name}
                onChange={setName}
                placeholder="Your name"
                type="text"
                leftIcon={<User />}
              />
              <Button
                onClick={handleNameSave}
                disabled={userLoading || !name.trim() || name === user?.name}
                size="sm"
              >
                Save name
              </Button>
            </CardComponent>
            <CardComponent
              title="Password"
              subTitle="Choose a strong password. At least 8 characters, including a number, an uppercase letter, and a special character."
              className="flex flex-col gap-4"
            >
              <div className="flex flex-col gap-2 w-full md:flex-row">
                <FormFieldGroup
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={newPassword}
                  onChange={setNewPassword}
                  leftIcon={<KeyRound />}
                  rightIcon={showPassword ? <EyeOff /> : <Eye />}
                  onRightIconClick={() => setShowPassword(prev => !prev)}
                />
                <FormFieldGroup
                  type={showConfirm ? 'text' : 'password'}
                  placeholder="Repeat password"
                  value={confirmPassword}
                  onChange={setConfirmPassword}
                  leftIcon={<KeyRound />}
                  rightIcon={showConfirm ? <EyeOff /> : <Eye />}
                  onRightIconClick={() => setShowConfirm(prev => !prev)}
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <PasswordStrength password={newPassword} />
                {confirmPassword && newPassword !== confirmPassword && (
                  <p className="text-xs text-destructive">
                    Passwords do not match.
                  </p>
                )}
              </div>

              <Button
                onClick={handlePasswordSave}
                disabled={
                  userLoading || !newPassword || newPassword !== confirmPassword
                }
                size="sm"
                className="self-start"
              >
                Update password
              </Button>
            </CardComponent>
          </TabsContent>
          <TabsContent value="history">
            <Card className="w-full">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <CalendarDays className="size-4 text-muted-foreground" />
                  <CardTitle className="text-base">Order History</CardTitle>
                </div>
                <CardDescription>
                  All your past bookings in one place.
                </CardDescription>
              </CardHeader>

              <CardContent className="flex flex-col gap-4">
                {bookingLoading ? (
                  <Spinner />
                ) : !bookings?.length ? (
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

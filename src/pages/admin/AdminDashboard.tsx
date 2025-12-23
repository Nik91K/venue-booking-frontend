import LayoutPage from '@/layoutPage';
import { BarChartComponent } from '@/components/common/charts/BarChart';
import type { ChartConfig } from '@/components/ui/chart';
import {
  bookingsByTimeSlot,
  bookingsByWeekday,
  monthlyBookings,
  dailyBookings,
} from '@/fixtures/charts.fixture';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  TrendingUp,
  TrendingDown,
  Users,
  Calendar,
  DollarSign,
  Clock,
} from 'lucide-react';

const AdminDashboard = () => {
  const bookingsByTimeSlotConfig = {
    bookings: { label: 'Bookings', color: 'oklch(0.6 0.118 184.704)' },
  } satisfies ChartConfig;

  const bookingsByWeekdayConfig = {
    bookings: { label: 'Bookings', color: 'oklch(0.646 0.222 41.116)' },
    revenue: { label: 'Revenue', color: 'oklch(0.6 0.118 184.704)' },
  } satisfies ChartConfig;

  const monthlyBookingsConfig = {
    completed: { label: 'Completed', color: 'oklch(0.646 0.222 41.116)' },
    cancelled: { label: 'Cancelled', color: 'oklch(0.577 0.245 27.325)' },
    noShow: { label: 'No Show', color: 'oklch(0.398 0.07 227.392)' },
    pending: { label: 'Pending', color: 'oklch(0.828 0.189 84.429)' },
  } satisfies ChartConfig;

  const dailyBookingsConfig = {
    bookings: { label: 'Bookings', color: 'oklch(0.6 0.118 184.704)' },
  } satisfies ChartConfig;

  const totalBookingsToday = 145;
  const bookingGrowth = 12.5;
  const totalRevenue = 8750;
  const revenueGrowth = 8.2;
  const activeUsers = 1247;
  const userGrowth = -3.1;
  const avgBookingDuration = 87;

  return (
    <LayoutPage>
      <div className="space-y-6 p-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Overview of your booking platform performance
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Today's Bookings
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalBookingsToday}</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3 text-green-600" />
                <span className="text-green-600">+{bookingGrowth}%</span> from
                yesterday
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Today's Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${totalRevenue.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3 text-green-600" />
                <span className="text-green-600">+{revenueGrowth}%</span> from
                yesterday
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Users
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {activeUsers.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <TrendingDown className="h-3 w-3 text-red-600" />
                <span className="text-red-600">{userGrowth}%</span> from last
                week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Avg. Duration
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{avgBookingDuration} min</div>
              <p className="text-xs text-muted-foreground mt-1">
                Per booking session
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Bookings by Time Slot</CardTitle>
              <CardDescription>
                Distribution of bookings throughout the day
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BarChartComponent
                data={bookingsByTimeSlot}
                config={bookingsByTimeSlotConfig}
                dataKeys={['bookings']}
                xAxisKey="time"
                xAxisFormat={value => value.slice(0, 5)}
                className="h-75"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Weekly Performance</CardTitle>
              <CardDescription>
                Bookings and revenue by day of week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BarChartComponent
                data={bookingsByWeekday}
                config={bookingsByWeekdayConfig}
                dataKeys={['bookings']}
                xAxisKey="day"
                xAxisFormat={value => value.slice(0, 3)}
                className="h-75"
              />
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Booking Status</CardTitle>
            <CardDescription>
              Breakdown of completed, cancelled, no-show, and pending bookings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <BarChartComponent
              data={monthlyBookings}
              config={monthlyBookingsConfig}
              dataKeys={['completed', 'cancelled', 'noShow', 'pending']}
              xAxisKey="month"
              xAxisFormat={value => value.slice(0, 3)}
              className="h-100 w-full"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Last 30 Days Trend</CardTitle>
            <CardDescription>Daily bookings for the past month</CardDescription>
          </CardHeader>
          <CardContent>
            <BarChartComponent
              data={dailyBookings}
              config={dailyBookingsConfig}
              dataKeys={['bookings']}
              xAxisKey="day"
              className="h-75 w-full"
            />
          </CardContent>
        </Card>
      </div>
    </LayoutPage>
  );
};

export default AdminDashboard;

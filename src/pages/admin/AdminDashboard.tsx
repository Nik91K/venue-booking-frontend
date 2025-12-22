import LayoutPage from '@/layoutPage';
import { BarChartComponent } from '@/components/common/charts/BarChart';
import type { ChartConfig } from '@/components/ui/chart';
import { bookingsByTimeSlot } from '@/fixtures/charts.fixture';

const AdminDashboard = () => {
  const bookingsByTimeSlotConfig = {
    bookings: { label: 'Bookings', color: 'oklch(0.6 0.118 184.704)' },
  } satisfies ChartConfig;

  return (
    <LayoutPage>
      <div>
        <BarChartComponent
          data={bookingsByTimeSlot}
          config={bookingsByTimeSlotConfig}
          dataKeys={['bookings']}
          xAxisKey="time"
          xAxisFormat={value => value.slice(0, 5)}
        />
      </div>
    </LayoutPage>
  );
};

export default AdminDashboard;

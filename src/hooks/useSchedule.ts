import { SCHEDULE_DAYS } from '@/types/schedule';
import type { ScheduleType, ScheduleDays } from '@/types/schedule';

const timeToMinutes = (time: string) => {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
};

const isNowOpen = (schedule: ScheduleType, currentMinutes: number) => {
  const open = timeToMinutes(schedule.openTime);
  const close = timeToMinutes(schedule.closeTime);

  if (close < open) {
    return currentMinutes >= open || currentMinutes < close;
  }

  return currentMinutes >= open && currentMinutes < close;
};

export const getEstablishmentStatus = (
  schedules: ScheduleType[],
  now = new Date()
) => {
  const today: ScheduleDays = SCHEDULE_DAYS[now.getDay()];
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const todaySchedule = schedules.find(s => s.day === today);

  if (todaySchedule && isNowOpen(todaySchedule, currentMinutes)) {
    return {
      open: true,
    };
  }

  for (let i = 0; i < 7; i++) {
    const day = SCHEDULE_DAYS[(SCHEDULE_DAYS.indexOf(today) + i) % 7];
    const sch = schedules.find(s => s.day === day);
    if (!sch) continue;

    if (i > 0 || currentMinutes < timeToMinutes(sch.openTime)) {
      return {
        open: false,
      };
    }
  }

  return {
    open: false,
  };
};

export const SCHEDULE_DAYS = [
  'SUNDAY',
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY',
] as const;

export type ScheduleDays = (typeof SCHEDULE_DAYS)[number];

export type ScheduleType = {
  id: number;
  day: ScheduleDays;
  openTime: string;
  closeTime: string;
  establishmentId: number;
};

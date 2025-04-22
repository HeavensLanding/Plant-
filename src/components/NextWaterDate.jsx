import { format, addDays, parseISO } from 'date-fns';

function NextWaterDate({ lastWatered, schedule }) {
  if (!lastWatered || !schedule) return null;

  // 🧠 Extract number from schedule string (e.g., "Every 3 Days")
  const match = schedule.match(/(\d+)/);
  const daysToAdd = match ? parseInt(match[1]) : 0;

  // Convert last watered date to actual Date
  const wateredDate = parseISO(lastWatered);
  const nextDate = addDays(wateredDate, daysToAdd);

  return (
    <p style={{ fontStyle: 'italic', color: '#b76e79', marginTop: '0.5rem' }}>
      💧 Next Water: {format(nextDate, 'MMMM d, yyyy')}
    </p>
  );
}

export default NextWaterDate;

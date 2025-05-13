export function displayCurrentDate() {
  const dateElement = document.getElementById('current-date');
  const today = new Date();

  const weekdayNames = ['Söndag', 'Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag'];
  const monthNames = [
    'januari', 'februari', 'mars', 'april', 'maj', 'juni',
    'juli', 'augusti', 'september', 'oktober', 'november', 'december'
  ];

  const formattedDate = `${weekdayNames[today.getDay()]} ${today.getDate()} ${monthNames[today.getMonth()]} ${today.getFullYear()}`;

  if (dateElement) {
    dateElement.textContent = formattedDate;
  }
}
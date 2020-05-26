export const decodeHtml = (html: string) => {
  let txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
};

export const millisToMinutesAndSeconds = (millis: number) => {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return `${minutes} min(s) ${seconds} secs`;
};

export const shuffleArrayElements = (array: Array<string>) => {
  let newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

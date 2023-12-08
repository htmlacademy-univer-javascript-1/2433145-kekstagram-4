const getData = () =>
  fetch('https://29.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error();
    });

const sendData = (body) =>
  fetch('https://29.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body: body,
    });

export {sendData, getData};

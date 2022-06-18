window.onload = () => {
  const clickMeBtn = document.createElement('button');
  clickMeBtn.innerHTML = 'Cookies Guard';
  clickMeBtn.id = 'openModalBtn';
  clickMeBtn.style.cssText = `
    background-color: #fff1eb;
    border: 2px solid #ffaa87;
    color: #000;
    font-size: 14px;
    padding: 10px 15px;
    position: absolute;
    bottom: 20px;
    right: 20px;
    cursor: pointer;
  `;
  document.body.appendChild(clickMeBtn);

  const div = document.createElement('div');
  div.id = 'modal';
  div.style.cssText = `
    display: none;
    flex-direction: column;
    background-color: #fff1eb;
    border: 2px solid #ffaa87;
    color: #000;
    position: absolute;
    top: 20%;
    left: 25%;
    width: 45%;
    height: 60%;
    overflow: auto;
  `;
  document.body.appendChild(div);

  const modal = document.getElementById('modal');
  const closeBtn = document.createElement('button');
  closeBtn.id = 'closeBtn';
  closeBtn.style.cssText = `
    display: flex;
    align-self: flex-end;
    background-color: transparent;
    border: none;
    font-size: 14px;
    cursor: pointer;
    width: 5%;
  `;

  const modalHeader = document.createElement('div');
  modalHeader.id = 'modalHeader';
  modalHeader.style.cssText = `
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
  `;
  modal.appendChild(modalHeader);

  const h1 = document.createElement('h1');
  h1.innerHTML = 'Cookies';
  h1.style.cssText = `
    width: 95%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    margin: 0;
  `;

  modalHeader.appendChild(h1);
  modalHeader.appendChild(closeBtn);

  const closeButton = document.getElementById('closeBtn');
  const xMarkImg = document.createElement('img');
  xMarkImg.src = './icons/xmark-solid.svg';
  xMarkImg.style.cssText = `
    width: 15px;
  `;
  closeButton.appendChild(xMarkImg);

  const openButton = document.getElementById('openModalBtn');

  const handleOpenModal = (el) => {
    el.currentTarget.classList.add('active');
    modal.style.display = el.currentTarget.classList.contains('active') ? 'flex' : 'none';

    if (document.querySelector('tbody')) {
      document.querySelector('tbody').remove();
    };
    const cookies = document.cookie.split('; ');
    if (cookies.length && cookies[0] !== '') {
      createTable();
    };
  };
  openButton.addEventListener('click', handleOpenModal);

  const handleCloseModal = (el) => {
    el.currentTarget.classList.add('active');
    modal.style.display = el.currentTarget.classList.contains('active') ? 'none' : 'flex';
  };
  closeButton.addEventListener('click', handleCloseModal);

  const table = document.createElement('table');
  table.style.cssText = `
    width: 94%;
    display: flex;
    flex-direction: column;
    margin: 20px 0 0 20px;
  `;
  const thead = document.createElement('thead');
  thead.style.cssText = `
    background-color: #ffa581;
    padding: 5px 0;
  `;
  table.appendChild(thead);
  document.getElementById('modal').appendChild(table);
  
  const rowHeader = document.createElement('tr');
  rowHeader.style.cssText = `
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
  `;
  const name = document.createElement('th');
  name.style.cssText = `
    width: 25%;
    display: flex;
  `;
  name.innerHTML = "Cookie name";
  const value = document.createElement('th');
  value.style.cssText = `
    width: 25%;
    display: flex;
  `;
  value.innerHTML = "Value";
  const remove = document.createElement('th');
  remove.style.cssText = `
    width: 25%;
    display: flex;
  `;
  remove.innerHTML = "";

  rowHeader.appendChild(name);
  rowHeader.appendChild(value);
  rowHeader.appendChild(remove);
  thead.appendChild(rowHeader);

  const createTable = () => {
    const tbody = document.createElement('tbody');
    table.appendChild(tbody);
    const cookies = document.cookie.split('; ');
    const cookiesArray = cookies.reduce((acc, val) => {
      const splitArr = val.split('=');
      return [...acc, { name: splitArr[0], value: splitArr[1] }];
    }, []);

    cookiesArray.map(({ name, value}, index) => {
      const rowBody = document.createElement('tr');
      rowBody.style.cssText = `
        display: flex;
        justify-content: space-around;
        align-items: flex-start;
        padding: 5px 0;
        background-color: ${index % 2 === 0 ? '#ffcbb6' : '#ffe2d7'};
      `;
      const cookieName = document.createElement('td');
      cookieName.style.cssText = `
        width: 25%;
      `;
      const cookieValue = document.createElement('td');
      cookieValue.style.cssText = `
        width: 25%;
      `;
      const removeCookie = document.createElement('td');
      removeCookie.style.cssText = `
        width: 25%;
        display: flex;
        justify-content: center;
        align-items: center;
      `;
      cookieName.innerHTML = name;
      cookieValue.innerHTML = value;
      const removeBtn = document.createElement('button');
      removeBtn.style.cssText = `
        border: none;
        background-color: transparent;
        font-size: 11px;
        cursor: pointer;
      `;
      const trashCanImg = document.createElement('img');
      trashCanImg.src = './icons/trash-can-solid.svg';
      trashCanImg.style.cssText = `
        width: 15px;
      `;
      removeBtn.addEventListener('click', () => {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        tbody.remove();
        if (cookies.length > 1) {
          createTable();
        };
      });
  
      removeBtn.appendChild(trashCanImg);
      removeCookie.appendChild(removeBtn);
      rowBody.appendChild(cookieName);
      rowBody.appendChild(cookieValue);
      rowBody.appendChild(removeCookie);
      tbody.appendChild(rowBody);
    });
  };

  const cookies = document.cookie.split('; ');
  if (cookies.length && cookies[0] !== '') {
    createTable();
  };
};
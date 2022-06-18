const initSelect = () => {
  const selected = document.querySelectorAll('.selected');
  const optionsList = document.querySelectorAll('.select-box__option');

  selected.forEach(item => {
    item.addEventListener('click', () => {
      const optionsContainer = item.parentNode.querySelector('.select-box__options');
      optionsContainer.classList.toggle('active');
    });
  })

  optionsList.forEach(option => {
    option.addEventListener('click', (e) => {
      const parent = e.target.closest('.select-box');
      const eventType = parent.dataset.type;
      const selected = option.querySelector('label').innerHTML;
      parent.querySelector('.selected').innerHTML = selected;
      option.parentNode.classList.remove('active');
      const eventDetail = {
        eventType: eventType,
        value: selected.toLowerCase(),
      }
      const changedSettings = new CustomEvent('changeSettings', { detail: eventDetail });
      document.dispatchEvent(changedSettings);
    });
  });
}

export default initSelect;

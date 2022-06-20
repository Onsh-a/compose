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
      const option = e.target.closest('.select-box__option')
      const optionValue = option.dataset[eventType];
      parent.querySelector('.selected').innerHTML = option.querySelector('label').innerHTML;
      option.parentNode.classList.remove('active');
      const eventDetail = {
        eventType: eventType,
        value: optionValue,
      }
      const changedSettings = new CustomEvent('changeSettings', { detail: eventDetail });
      document.dispatchEvent(changedSettings);
    });
  });
}

export default initSelect;

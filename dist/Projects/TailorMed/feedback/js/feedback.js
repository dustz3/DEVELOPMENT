document.addEventListener('DOMContentLoaded', function () {
  var cards = Array.prototype.slice.call(document.querySelectorAll('[data-step]'));
  if (!cards.length) {
    return;
  }

  var QUESTION_IDS = ['q1', 'q2', 'q3', 'q4', 'q5'];

  function showStep(stepId) {
    cards.forEach(function (card) {
      card.classList.toggle('is-active', card.dataset.step === String(stepId));
    });
  }

  function collectFeedbackPayload() {
    var payload = {
      name: document.querySelector('#feedback-name')?.value?.trim() || '',
      order: document.querySelector('#feedback-order')?.value?.trim() || '',
      company: document.querySelector('#feedback-company')?.value?.trim() || '',
      email: document.querySelector('#feedback-email')?.value?.trim() || '',
    };

    QUESTION_IDS.forEach(function (id) {
      var rating = document.querySelector('input[name="' + id + '-rating"]:checked');
      var notes = document.querySelector('#' + id + '-notes');
      payload[id] = {
        rating: rating ? Number(rating.value) : '',
        notes: notes ? notes.value.trim() : '',
      };
    });

    return payload;
  }

  function submitFeedback() {
    var payload = collectFeedbackPayload();

    return fetch('/.netlify/functions/submit-feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }).then(function (response) {
      if (!response.ok) {
        return response.text().then(function (text) {
          throw new Error(text || 'Failed to submit feedback.');
        });
      }
      return response.json();
    });
  }

  document.querySelectorAll('[data-next-step]').forEach(function (button) {
    button.addEventListener('click', function (event) {
      event.preventDefault();
      var target = button.dataset.nextStep;
      if (!target) {
        return;
      }

      if (target === 'complete') {
        button.disabled = true;
        submitFeedback()
          .catch(function (error) {
            console.error(error);
            alert('送出資料時發生問題，請稍後再試。\n' + error.message);
          })
          .finally(function () {
            button.disabled = false;
            showStep(target);
          });
        return;
      }

      showStep(target);
    });
  });

  showStep('0');
});


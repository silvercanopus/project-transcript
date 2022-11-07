(function () {
    const goodMarkButtons = document.querySelectorAll('.mark-btn-good');

    Array.from(goodMarkButtons).forEach(button => {
        button.addEventListener('click', event => {
            for (let element of event.path) {
                if (element.classList.contains('line')) {
                    element.classList.remove('mark-bad');
                    element.classList.add('mark-good');
                    break;
                }
            }
        })
    })

    const badMarkButtons = document.querySelectorAll('.mark-btn-bad');

    Array.from(badMarkButtons).forEach(button => {
        button.addEventListener('click', event => {
            for (let element of event.path) {
                if (element.classList.contains('line')) {
                    element.classList.remove('mark-good');
                    element.classList.add('mark-bad');
                    break;
                }
            }
        })
    })
    
    const noneMarkButtons = document.querySelectorAll('.mark-btn-none');

    Array.from(noneMarkButtons).forEach(button => {
        button.addEventListener('click', event => {
            for (let element of event.path) {
                if (element.classList.contains('line')) {
                    element.classList.remove('mark-good');
                    element.classList.remove('mark-bad');
                    break;
                }
            }
        })
    })
})()

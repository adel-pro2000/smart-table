export function initFiltering(elements) {
    // @todo: #4.1 — заполнить выпадающие списки опциями
    const updateIndexes = (elements, indexes) => {
        Object.keys(indexes).forEach(elementName => {
            elements[elementName].append(...Object.values(indexes[elementName]).map(name => {
                    const el = document.createElement('option');

                    el.textContent = name;
                    el.value = name;

                    return el;
                })
            );
        });
    };

    const applyFiltering = (query, state, action) => {
        if (action?.name === 'clear') {
            const field = action.dataset.field;
            const input = action.parentElement.querySelector('input, select');

            if (input) {
                input.value = '';
                state[field] = '';
            }
        }

        const filter = {};
        Object.keys(elements).forEach(key => {
            if (elements[key]) {
                if (['INPUT', 'SELECT'].includes(elements[key].tagName) && elements[key].value) { // ищем поля ввода в фильтре с непустыми данными
                    filter[`filter[${elements[key].name}]`] = elements[key].value; // чтобы сформировать в query вложенный объект фильтра
                }
            }
        });

        return Object.keys(filter).length ? Object.assign({}, query, filter) : query;
    };

    return {
        updateIndexes,
        applyFiltering
    };
}
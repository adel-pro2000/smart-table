export function initFiltering(elements) {
    // @todo: #4.1 — заполнить выпадающие списки опциями
    const updateIndexes = (elements, indexes) => {
        Object.keys(indexes).forEach(elementName => {
            elements[elementName].append(
                ...Object.values(indexes[elementName]).map(name => {
                    const option = document.createElement('option');

                    option.textContent = name;
                    option.value = name;

                    return option;
                })
            );
        });
    };

    const applyFiltering = (query, state, action) => {
        // Очистка конкретного поля
        if (action?.name === 'clear') {
            const field = action.dataset.field;
            const input = action.parentElement.querySelector('input');

            if (input) {
                input.value = '';
                state[field] = '';
            }
        }

        const filter = {};

        Object.keys(elements).forEach(key => {
            const element = elements[key];

            if (
                element &&
                ['INPUT', 'SELECT'].includes(element.tagName) &&
                element.value
            ) {
                filter[`filter[${element.name}]`] = element.value;
            }
        });

        return Object.keys(filter).length
            ? Object.assign({}, query, filter)
            : query;
    };

    return {
        updateIndexes,
        applyFiltering
    };
}
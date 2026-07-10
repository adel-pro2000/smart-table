import {getPages} from "../lib/utils.js";

export const initPagination = ({pages, fromRow, toRow, totalRows}, createPage) => {
    // @todo: #2.3 — подготовить шаблон кнопки для страницы и очистить контейнер
    const pageTemplate = pages.firstElementChild.cloneNode(true);
    pages.firstElementChild.remove();

    let pageCount;

    const applyPagination = (query, state, action) => {
        const limit = state.rowsPerPage;
        let page = state.page;

        // Обрабатываем нажатия на кнопки пагинации
        if (action) {
            switch (action.name) {
                case 'prev':
                    page = Math.max(1, page - 1);
                    break;

                case 'next':
                    page = Math.min(pageCount, page + 1);
                    break;

                case 'first':
                    page = 1;
                    break;

                case 'last':
                    page = pageCount;
                    break;
            }
        }

        return Object.assign({}, query, {
            limit,
            page
        });
    };

    /**
     * Перерисовывает пагинатор после получения данных
     */
    const updatePagination = (total, { page, limit }) => {
        pageCount = Math.ceil(total / limit);

        // Получаем номера страниц, которые нужно показать
        const visiblePages = getPages(page, pageCount, 5);

        // Создаём кнопки страниц
        pages.replaceChildren(
            ...visiblePages.map(pageNumber => {
                const el = pageTemplate.cloneNode(true);

                return createPage(
                    el,
                    pageNumber,
                    pageNumber === page
                );
            })
        );

        // Обновляем информацию под таблицей
        fromRow.textContent = total === 0
            ? 0
            : (page - 1) * limit + 1;

        toRow.textContent = Math.min(page * limit, total);

        totalRows.textContent = total;
    };

    return {
        applyPagination,
        updatePagination
    };
}
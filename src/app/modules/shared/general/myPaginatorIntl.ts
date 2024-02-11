import { MatPaginatorIntl } from '@angular/material/paginator';

export class MyPaginatorIntl extends MatPaginatorIntl {
    override itemsPerPageLabel = 'פריטים לעמוד:';

    // ייתכן שתרצה להתאים גם את הטקסט האחר של ה Paginator
    // לדוגמה, אם יש לך מידע על סך הכל של הפריטים
    // ניתן להוסיף:
    // totalItemsLabel = 'סך הכל:';

    override firstPageLabel = 'ראשון';
    override lastPageLabel = 'אחרון';
    override nextPageLabel = 'הבא';
    override previousPageLabel = 'הקודם';

    override getRangeLabel = (page: number, pageSize: number, length: number) => {
        if (length === 0 || pageSize === 0) {
            return `0 מתוך ${length}`;
        }
        length = Math.max(length, 0);
        const startIndex = page * pageSize;
        const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
        return `${startIndex + 1} - ${endIndex} מתוך ${length}`;
    };
}

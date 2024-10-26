import { useEffect } from 'react';


const PerformanceMetrics = () => {


    useEffect(() => {
        // Проверяем наличие меток и измеряем время, если метка завершения есть
        const handleNavigationEnd = () => {
            if (performance.getEntriesByName('navigation-end').length > 0) {
                performance.measure('page-load-time', 'navigation-start', 'navigation-end');

                const entries = performance.getEntriesByName('page-load-time');
                if (entries.length) {
                    const entry = entries[0];
                    console.log(`Полное время загрузки и рендеринга страницы: ${entry.duration} мс`);
                    // Очищаем метки и измерения
                    performance.clearMarks('navigation-start');
                    performance.clearMarks('navigation-end');
                    performance.clearMeasures('page-load-time');
                }
            }
        };

        // Добавляем слушателя события, когда метка завершения установлена
        const observer = new PerformanceObserver((list) => {
            const entries = list.getEntriesByName('navigation-end');
            if (entries.length > 0) {
                handleNavigationEnd();
            }
        });

        observer.observe({ entryTypes: ['mark'] });

        // Убираем слушателя при размонтировании компонента
        return () => observer.disconnect();
    }, []);

    return null;
};

export default PerformanceMetrics;

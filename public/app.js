document.addEventListener('DOMContentLoaded', function () {
    const createFolderBtn = document.getElementById('createFolderBtn');
    const deleteFolderBtn = document.getElementById('deleteFolderBtn');
    const uploadFileBtn = document.getElementById('uploadFileBtn');
    const downloadFileBtn = document.getElementById('downloadFileBtn');
    const deleteFileBtn = document.getElementById('deleteFileBtn');
    const renameBtn = document.getElementById('renameBtn');

    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('main-content');

    let activeFolder = null;

    createFolderBtn.addEventListener('click', function () {
        const folderName = prompt('Enter folder name:');
        if (folderName) {
            const folderNode = { name: folderName, children: [] };
            renderTree(folderNode, sidebar);

            // Получаем сохраненные данные из localStorage
            const storedData = JSON.parse(localStorage.getItem('treeData')) || [];

            // Обновляем данные и сохраняем их в localStorage
            storedData.push(folderNode);
            localStorage.setItem('treeData', JSON.stringify(storedData));
        }
    });

    deleteFolderBtn.addEventListener('click', function () {
        alert('Delete Folder button clicked');
    });

    uploadFileBtn.addEventListener('click', function () {
        alert('Upload File button clicked');
    });

    downloadFileBtn.addEventListener('click', function () {
        alert('Download File button clicked');
    });

    deleteFileBtn.addEventListener('click', function () {
        alert('Delete File button clicked');
    });

    renameBtn.addEventListener('click', function () {
        alert('Rename button clicked');
    });

    // Функция для отрисовки дерева
    function renderTree(node, parentElement) {
        const container = document.createElement('div');
        container.innerHTML = node.name;
        container.classList.add('tree-node');

        container.addEventListener('click', function (event) {
            event.stopPropagation(); // Остановить всплытие события

            // Если у элемента есть дети, обработаем их
            if (node.children) {
                const isOpen = container.classList.contains('open');
                if (isOpen) {
                    // Если элемент открыт, закрываем его и убираем класс open
                    container.classList.remove('open');
                    // Если был выбран элемент с детьми, удаляем класс active
                    container.classList.remove('active');
                } else {
                    // Если элемент закрыт, открываем его и добавляем класс open
                    container.classList.add('open');
                    // Если элемент с детьми был выбран, добавляем класс active
                    container.classList.add('active');
                }
            } else {
                // Если у элемента нет детей, обработаем его как обычный клик
                mainContent.innerHTML = `Clicked on: ${node.name}`;

                // Удаляем класс active у предыдущего активного элемента
                const activeNode = document.querySelector('.tree-node.active');
                if (activeNode) {
                    activeNode.classList.remove('active');
                }

                // Добавляем класс active к текущему элементу
                container.classList.add('active');
            }
        });

        parentElement.appendChild(container);

        if (node.children) {
            const childrenContainer = document.createElement('div');
            childrenContainer.classList.add('children-container');

            node.children.forEach((child) => renderTree(child, childrenContainer));
            container.appendChild(childrenContainer);
        }
    }

    // Отрисовка дерева при загрузке страницы
    const storedData = JSON.parse(localStorage.getItem('treeData')) || [];
    storedData.forEach((node) => renderTree(node, sidebar));
});

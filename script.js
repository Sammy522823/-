document.addEventListener('DOMContentLoaded', function() {
    const tableBody = document.querySelector('#blocksTable tbody');
    const addBtn = document.getElementById('addBlockBtn');

    // 1. 添加新方块
    addBtn.addEventListener('click', function() {
        // 弹窗让用户输入数据
        const blockName = prompt("请输入方块名称:");
        if (!blockName) return; // 如果点取消，退出

        const coords = prompt("请输入坐标位置 (例如 X:10, Y:64, Z:5):");
        if (!coords) return;

        // 创建新的一行
        const newRow = createRowElement(blockName, coords, "未认领");
        tableBody.appendChild(newRow);
    });

    // 2. 创建行的函数 (封装起来方便复用)
    function createRowElement(block, coords, assignee) {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${block}</td>
            <td>${coords}</td>
            <td>${assignee}</td>
            <td>
                <button class="edit-btn">编辑</button>
                <button class="delete-btn">删除</button>
            </td>
        `;

        // 给新创建的按钮添加事件监听
        row.querySelector('.edit-btn').addEventListener('click', handleEdit);
        row.querySelector('.delete-btn').addEventListener('click', handleDelete);

        return row;
    }

    // 3. 删除功能
    function handleDelete(e) {
        if (confirm("确定要删除这一行吗？")) {
            // 找到按钮所在的那一行 <tr>，然后移除它
            const row = e.target.closest('tr');
            row.remove();
        }
    }

    // 4. 编辑功能
    function handleEdit(e) {
        const button = e.target;
        const row = button.closest('tr');
        
        // 获取当前这一行的数据
        const cells = row.querySelectorAll('td');
        const currentBlock = cells[0].textContent;
        const currentCoords = cells[1].textContent;
        const currentAssignee = cells[2].textContent;

        // 弹窗让用户修改（如果用户不输入，就保持原样）
        const newBlock = prompt("修改方块名称:", currentBlock) || currentBlock;
        const newCoords = prompt("修改坐标位置:", currentCoords) || currentCoords;
        const newAssignee = prompt("修改认领人:", currentAssignee) || currentAssignee;

        // 更新页面上的数据
        cells[0].textContent = newBlock;
        cells[1].textContent = newCoords;
        cells[2].textContent = newAssignee;
    }

    // 5. 为页面上已有的按钮绑定事件
    // 因为页面加载时已经有了一行示例数据，需要给它也加上功能
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', handleDelete);
    });

    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', handleEdit);
    });
});

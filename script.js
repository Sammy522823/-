// 这里是你的数据。请根据你的Excel表格内容修改这里的数组。
// 如果你的表格里有数据，请按照下面的格式填入：
const blocksData = [
    { block: "橡木木板", count: 1000, assigned: "" },
    { block: "圆石", count: 5000, assigned: "" },
    { block: "玻璃", count: 200, assigned: "" },
    // 添加更多方块...
];

// 获取DOM元素
const tableBody = document.getElementById('blocksTable').getElementsByTagName('tbody')[0];
const modal = document.getElementById('modal');
const modalBlockName = document.getElementById('modalBlockName');
const playerNameInput = document.getElementById('playerName');
const confirmBtn = document.getElementById('confirmBtn');
const closeBtn = document.querySelector('.close');

let currentRowIndex = -1; // 记录当前点击的是哪一行

// 1. 初始化表格
function initTable() {
    blocksData.forEach((item, index) => {
        const row = tableBody.insertRow();
        
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2); // 认领人
        const cell4 = row.insertCell(3); // 操作按钮

        cell1.textContent = item.block;
        cell2.textContent = item.count;
        cell3.textContent = item.assigned || "未认领";
        cell3.id = `assignee-${index}`; // 用于后续更新

        const btn = document.createElement('button');
        btn.textContent = "认领";
        btn.onclick = (e) => {
            e.stopPropagation(); // 防止触发行点击事件
            openModal(index, item.block);
        };
        cell4.appendChild(btn);
    });
}

// 2. 打开弹窗
function openModal(index, blockName) {
    currentRowIndex = index;
    modalBlockName.textContent = blockName;
    modal.style.display = "block";
    playerNameInput.value = ""; // 清空上次输入
    playerNameInput.focus();
}

// 3. 关闭弹窗
closeBtn.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// 4. 确认认领
confirmBtn.addEventListener('click', function() {
    const playerName = playerNameInput.value.trim();
    if (playerName === "") {
        alert("请输入你的游戏ID！");
        return;
    }

    // 更新数据
    blocksData[currentRowIndex].assigned = playerName;
    
    // 更新页面显示
    document.getElementById(`assignee-${currentRowIndex}`).textContent = playerName;
    
    // 关闭弹窗
    modal.style.display = "none";
    
    alert(`成功！${playerName} 已认领 ${blocksData[currentRowIndex].block}`);
});

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', initTable);

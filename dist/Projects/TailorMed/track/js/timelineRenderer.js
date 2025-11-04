// Timeline Renderer - 動態渲染 Timeline 組件
// 用於 timelineVisual.pug 組件的動態渲染

/**
 * 格式化日期時間顯示
 * @param {Object} item - Timeline 項目
 * @returns {string} 格式化後的日期時間字串
 */
function formatTimelineDateTime(item) {
  const hasDate = item.date && item.date.trim() !== '';
  const hasTime = item.time && item.time.trim() !== '';

  if (hasDate && hasTime) {
    // 格式化日期：YYYY-MM-DD → YYYY/MM/DD
    const formattedDate = item.date.replace(/-/g, '/');
    return `${formattedDate} ${item.time}`;
  } else if (hasDate) {
    return item.date.replace(/-/g, '/');
  } else if (hasTime) {
    return item.time;
  } else {
    // 根據狀態顯示不同的文字
    if (item.status === 'processing') {
      return 'Processing...';
    } else if (item.status === 'pending') {
      return 'Pending...';
    }
    return 'Pending...';
  }
}

/**
 * 格式化日期為月份和日期
 * @param {string} dateStr - 日期字串 (YYYY-MM-DD)
 * @returns {Object} { month: string, day: string }
 */
function formatDateParts(dateStr) {
  if (!dateStr || dateStr.trim() === '') {
    return { month: '', day: 'TBD' };
  }

  try {
    const date = new Date(dateStr);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return {
      month: months[date.getMonth()] || '',
      day: date.getDate().toString()
    };
  } catch (error) {
    return { month: '', day: 'TBD' };
  }
}

/**
 * 渲染 Timeline 節點
 * @param {Array} timelineData - Timeline 資料陣列
 * @param {string} containerSelector - 容器選擇器（預設：'.timeline-nodes-container'）
 */
function renderTimelineNodes(timelineData, containerSelector = '.timeline-nodes-container') {
  const container = document.querySelector(containerSelector);
  if (!container) {
    console.warn(`Timeline container not found: ${containerSelector}`);
    return;
  }

  // 清空容器
  container.innerHTML = '';

  if (!timelineData || timelineData.length === 0) {
    return;
  }

  // 重新編號步驟（事件不編號）
  let stepCounter = 1;
  const steps = timelineData.filter(item => !item.isEvent);
  steps.forEach((item) => {
    item.displayStep = stepCounter++;
  });

  // 渲染每個節點
  timelineData.forEach((item) => {
    // 跳過事件（事件由 renderTimelineEvents 處理）
    if (item.isEvent) {
      return;
    }

    const stepDisplay = item.displayStep || item.step || stepCounter++;
    const dateTimeDisplay = formatTimelineDateTime(item);
    const dateParts = formatDateParts(item.date);

    // 判斷節點的狀態和樣式類別
    const isOrderCompleted = item.isOrderCompleted === true;
    const status = item.status || 'pending';
    
    // 決定節點的 CSS 類別
    let nodeClass = 'timeline-node';
    let circleClass = 'node-circle';
    
    if (isOrderCompleted) {
      nodeClass += ' timeline-node--completed timeline-node--order-completed';
      circleClass += ' node-circle--completed node-circle--order-completed';
    } else if (status === 'processing') {
      nodeClass += ' timeline-node--processing';
      circleClass += ' node-circle--processing';
    } else if (status === 'completed') {
      nodeClass += ' timeline-node--completed';
      circleClass += ' node-circle--completed';
    } else {
      nodeClass += ' timeline-node--pending';
      circleClass += ' node-circle--pending';
    }

    // 建立節點 HTML
    const nodeHTML = `
      <div class="${nodeClass}" data-step="${stepDisplay}" data-status="${status}">
        <div class="node-date">
          <span class="month">${dateParts.month}</span>
          <span class="day">${dateParts.day}</span>
        </div>
        <div class="node-icon">
          <div class="${circleClass}">${stepDisplay}</div>
        </div>
        <div class="node-info">
          <div class="node-status">${item.title || '—'}</div>
          <p class="node-time">${dateTimeDisplay}</p>
        </div>
      </div>
    `;

    container.insertAdjacentHTML('beforeend', nodeHTML);
  });
}

/**
 * 渲染 Timeline 事件
 * @param {Array} timelineData - Timeline 資料陣列
 * @param {string} containerSelector - 容器選擇器（預設：'.timeline-events'）
 */
function renderTimelineEvents(timelineData, containerSelector = '.timeline-events') {
  const container = document.querySelector(containerSelector);
  if (!container) {
    console.warn(`Timeline events container not found: ${containerSelector}`);
    return;
  }

  // 清空容器
  container.innerHTML = '';

  if (!timelineData || timelineData.length === 0) {
    return;
  }

  // 過濾出事件項目
  const events = timelineData.filter(item => item.isEvent === true);

  if (events.length === 0) {
    return;
  }

  // 渲染每個事件
  events.forEach((event) => {
    const dateTimeDisplay = formatTimelineDateTime(event);

    const eventHTML = `
      <div class="event-dryice-refilled" data-event-type="${event.eventType || 'dryice'}">
        <div class="event-circle"></div>
        <div class="event-tag">
          <span class="event-tag-text">${event.title || 'Dry Ice Refilled'}</span>
          <img class="event-tag-icon" src="./images/icon-dryice.svg" alt="Dry Ice Refilled">
        </div>
        ${dateTimeDisplay ? `<div class="event-time">${dateTimeDisplay}</div>` : ''}
      </div>
    `;

    container.insertAdjacentHTML('beforeend', eventHTML);
  });
}

/**
 * 渲染完整的 Timeline（包含節點和事件）
 * @param {Array} timelineData - Timeline 資料陣列
 * @param {Object} options - 選項
 * @param {string} options.nodesContainer - 節點容器選擇器
 * @param {string} options.eventsContainer - 事件容器選擇器
 */
function renderTimeline(timelineData, options = {}) {
  const {
    nodesContainer = '.timeline-nodes-container',
    eventsContainer = '.timeline-events'
  } = options;

  // 渲染節點
  renderTimelineNodes(timelineData, nodesContainer);

  // 渲染事件
  renderTimelineEvents(timelineData, eventsContainer);
}

// 導出函數（如果使用模組系統）
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    renderTimeline,
    renderTimelineNodes,
    renderTimelineEvents,
    formatTimelineDateTime,
    formatDateParts
  };
}


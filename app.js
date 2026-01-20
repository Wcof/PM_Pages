/**
 * EHS AI 数字人助手控制器
 */
class AvatarController {
    constructor() {
        this.container = document.getElementById('ehs-avatar-container');
        this.closeBtn = document.getElementById('close-btn');
        this.sendBtn = document.getElementById('send-btn');
        this.dialogInput = document.getElementById('dialog-input');
        
        this.init();
    }

    /**
     * 初始化事件监听
     */
    init() {
        // 点击悬浮球切换到激活状态
        if (this.container) {
            this.container.addEventListener('click', (e) => {
                // 如果点击的是关闭按钮，不触发切换
                if (e.target.closest('.close-btn')) {
                    return;
                }
                // 如果当前是 idle 状态，切换到 active
                if (this.container.classList.contains('state-idle')) {
                    this.toggleState();
                }
            });
        }

        // 关闭按钮点击事件
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleState();
            });
        }

        // 发送按钮点击事件
        if (this.sendBtn) {
            this.sendBtn.addEventListener('click', () => {
                this.handleSendMessage();
            });
        }

        // 输入框回车事件
        if (this.dialogInput) {
            this.dialogInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.handleSendMessage();
                }
            });
        }
    }

    /**
     * 切换状态：idle <-> active
     */
    toggleState() {
        if (this.container) {
            const isIdle = this.container.classList.contains('state-idle');
            
            if (isIdle) {
                // 切换到激活状态
                this.container.classList.remove('state-idle');
                this.container.classList.add('state-active');
                
                // 聚焦输入框
                setTimeout(() => {
                    if (this.dialogInput) {
                        this.dialogInput.focus();
                    }
                }, 400);
            } else {
                // 切换回空闲状态
                this.container.classList.remove('state-active');
                this.container.classList.add('state-idle');
            }
        }
    }

    /**
     * 处理发送消息
     */
    handleSendMessage() {
        if (!this.dialogInput) return;
        
        const message = this.dialogInput.value.trim();
        if (!message) return;

        // 添加用户消息到对话框
        this.addMessageToDialog('用户', message, 'user');
        
        // 清空输入框
        this.dialogInput.value = '';

        // 模拟 AI 回复（可以根据实际需求替换为真实的 API 调用）
        setTimeout(() => {
            this.addMessageToDialog('EHS AI 助手', '收到您的问题，正在处理中...', 'assistant');
        }, 500);
    }

    /**
     * 添加消息到对话框
     * @param {string} sender - 发送者
     * @param {string} message - 消息内容
     * @param {string} type - 消息类型 ('user' | 'assistant')
     */
    addMessageToDialog(sender, message, type) {
        const dialogMessage = this.container.querySelector('.dialog-message');
        if (!dialogMessage) return;

        const messageEl = document.createElement('p');
        messageEl.innerHTML = `<strong style="color: ${type === 'user' ? '#00F0FF' : '#FF4D4D'}">${sender}:</strong> ${message}`;
        
        dialogMessage.appendChild(messageEl);
        
        // 滚动到底部
        dialogMessage.scrollTop = dialogMessage.scrollHeight;
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    new AvatarController();
});

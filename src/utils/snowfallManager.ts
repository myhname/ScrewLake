export default class SnowfallManager {
    private snowflakesInstance: any = null;
    private isInitialized: boolean = false;

    constructor(private readonly options: { color?: string }) {
    }

    public init(containerId: string): void {
        if (this.isInitialized) return;

        // 引入本地的 snowflakes.min.js 文件
        const script = document.createElement('script');
        script.src = '/library/snowflakes.min.js'; // 根据实际情况调整路径
        script.onload = () => {
            this.snowflakesInstance = new (window as any).Snowflakes({
                ...this.options,
                container: document.getElementById(containerId),
            });
            this.isInitialized = true;
        };
        document.head.appendChild(script);
    }

    public destroy(): void {
        if (!this.isInitialized || !this.snowflakesInstance) return;

        // 如果插件提供了 destroy 方法，应该调用它来清理资源
        if (typeof this.snowflakesInstance.destroy === 'function') {
            this.snowflakesInstance.destroy();
        }

        // 如果没有提供 destroy 方法，可能需要手动清理
        this.snowflakesInstance = null;
        this.isInitialized = false;
    }
}
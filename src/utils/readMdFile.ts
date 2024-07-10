export const fetchMarkdown = async (file: string) => {
    try {
        const response = await fetch(`/ScrewLake/data/notes/${file}.md`);
        if (!response.ok) {
            throw new Error('Network response was not ok' + response.statusText);
        }
        console.log("文件读取路径", `./src/data/notes/${file}.md`)
        return await response.text();
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}
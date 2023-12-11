module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("index.js")

	eleventyConfig.addNunjucksShortcode('resultSectionToggle', function (title) {
		return `<div class="flex justify-between items-center border p-2 hover:cursor-pointer" @click="sectionVisible = !sectionVisible">
                <div>${title}</div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4" x-show="!sectionVisible" x-transition:enter.duration.500ms>
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4" x-show="sectionVisible" x-transition:enter.duration.500ms>
                                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5"/>
                </svg>
            </div>`
	})
}
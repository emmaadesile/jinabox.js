import SearchComponent from './SearchComponent.js';
import _icons from './icons.js';

class Floater extends SearchComponent{
	constructor(){
		super();

		this.floaterIcon = _icons[this.settings.floaterIcon] || this.settings.floaterIcon;
		this.closeIcon = _icons.closeDark;
		this.showBox = false;

		//Override Inherited Methods
		this.handleDrag = () => {
			this.dragCounter++;
			if (this.showBox) {
				this.highlightArea();
				this.highlightSearch();
			} else {
				if(this.settings.showDropzone && this.settings.showDropzone!=='false')
				this.showLargeFloater();
			}
		}
		this.handleDragLeave = () => {
			console.log('leave')
			this.dragCounter--;
			if (this.dragCounter < 1) {
				if (this.showBox) {
					this.unhighlightArea();
					this.unhighlightSearch();
				} else {
					this.hideLargeFloater();
				}
				this.dragCounter = 0;
			}
		}
		this.showContentContainer = () =>{
			if(!this.showBox)
				this.toggleShow();	
		}
		//End Override Inherited Methods

		//Class Specific Methods
		this.toggleShow = () => {
			console.log('toggle show');
			this.hideLargeFloater();
			this.showBox = !this.showBox;
			if (this.showBox) {
				this.floaterBox.classList.add('jina-floater-box-visible');
				document.querySelector('#jina-floater-button img').src = this.closeIcon;
			} else {
				this.clearDropArea();
				this.floaterBox.classList.remove('jina-floater-box-visible');
				document.querySelector('#jina-floater-button img').src = this.floaterIcon;
			}
		}
		this.clearDropArea = () => {
			this.clearExpander();
			this.contentContainer.classList.remove('jina-scrollable');
			this.contentContainer.innerHTML = `
			<input type="file" id="jina-floater-file-input" class="jina-floater-file-input" multiple>
				<h3 class="jina-floater-instructions">Drop here to search</h3>
				`
		}
		this.showLargeFloater = () => {
			this.jinaButton.classList.add('jina-floater-large')
			this.jinaButton.classList.add('jina-ready')
		}
		this.hideLargeFloater = () => {
			this.jinaButton.classList.remove('jina-floater-large')
			this.jinaButton.classList.remove('jina-ready')
		}
		this.highlightArea = () => {
			this.contentContainer.classList.add('jina-highlighted')
			this.contentContainer.classList.add('jina-ready')
		}
		this.unhighlightArea = () => {
			this.contentContainer.classList.remove('jina-highlighted')
			this.contentContainer.classList.remove('jina-ready')
		}
		this.highlightSearch = () => {
			// this.searchBackground.classList.add('jina-bg-rainbow');
			this.searchInput.classList.add('jina-highlighted')
		}
		this.unhighlightSearch = () => {
			// this.searchBackground.classList.remove('jina-bg-rainbow');
			this.searchInput.classList.remove('jina-highlighted')
		}
		//End Class Specific Methods

		this.innerHTML = `
		<div class="jina-floater-container jina-theme-${this.settings.theme}">
			<div class="jina-floater" id="jina-floater-button">
				<img src="${this.floaterIcon}" class="jina-floater-icon"/>
				<h4 class="jina-floater-label">Drop here</h4>
			</div>
		</div>
		<div class="jina-floater-box jina-theme-${this.settings.theme}" id="jina-floater-box">
			<div class="jina-floater-search-container">
				<div id="jina-floater-background-search-container" class="jina-bg-default">
					<div class="jina-search-container">
						<img src="${this.defaultSearchIcon}" class="jina-search-icon" id="jina-floater-search-icon" onerror="this.src='${this.originalSearchIcon}'"/>
						<input placeholder="type or drop to search" class="jina-search-input jina-contained" id="jina-floater-search-box" autocomplete="off">
					</div>
				</div>
			</div>
			<div class="jina-floater-results-container" id="jina-floater-drop-area">
				<input type="file" id="jina-floater-file-input" class="jina-floater-file-input" multiple>
				<h3 class="jina-floater-instructions">Drop here to search</h3>
			</div>
		</div>
		`;

		this.defaultContent = `
		<input type="file" id="jina-floater-file-input" class="jina-floater-file-input" multiple>
			<h3 class="jina-floater-instructions">Drop here to search</h3>
			`;

		this.overlay = false;
		this.contentContainer = document.getElementById('jina-floater-drop-area');
		this.searchInput = document.getElementById('jina-floater-search-box');
		this.searchIcon = document.getElementById('jina-floater-search-icon');
		this.floaterBox = document.getElementById('jina-floater-box');
		this.jinaButton = document.getElementById('jina-floater-button');

		this.init();

		this.jinaButton.onclick = this.toggleShow;
		this.jinaButton.addEventListener('drop', this.handleDrop, false);
	}
}

export default Floater

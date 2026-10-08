import{n as s,t as r}from"./chunk-DxqKAYlM.js";import"./chunk-CPdLh2R-.js";import"./main-VHNMXON5.js";import{F as ft$1,K as ua,L as jt,T as Wt,U as pt,X as z,Z as zt$1,d as It$1,g as Nt,i as Bt$1,k as ba,m as Ma,p as M,r as At,s as Ft,u as Ht$1,x as St$1,y as Qt}from"./chunk-9C1G8Vpk.js";import{t as wo}from"./chunk-BMsdQTNM.js";var ut=`
<!-- \u2500\u2500 Collections view \u2500\u2500 -->
<div id="collections-view" class="lq-collections-view oc-scrollable" hidden>

  <div class="lq-col-header">
    <h1 class="lq-col-header__title" data-i18n="list.title">Workspaces</h1>
    <div class="lq-col-header__actions">
      <button class="lq-btn lq-btn--primary lq-btn--md" id="btn-add-collection">
        <i data-icon="col-plus"></i>
        <span data-i18n="list.addCollection">Add Workspace</span>
      </button>
    </div>
  </div>
  <p class="lq-col-subtitle" data-i18n="list.subtitle">Organize documents into reusable sets.</p>

  <!-- Tabs row -->
  <div class="lq-col-tabs">
    <div class="lq-col-tabs__scroll">
    <div class="oc-tab-group oc-tab-group--secondary">
      <div class="oc-tab-group__items" role="tablist">
        <button class="oc-tab oc-tab--md oc-tab-variant-secondary" role="tab" aria-selected="true" id="col-tab-all" data-filter="all">
          <span data-i18n="list.tabAll">All Workspaces</span> <span class="oc-tab__badge" id="col-badge-all">0</span>
        </button>
        <button class="oc-tab oc-tab--md oc-tab-variant-secondary" role="tab" aria-selected="false" id="col-tab-mine" data-filter="editor">
          <i data-icon="col-person"></i> <span data-i18n="list.tabEditor">Editor</span> <span class="oc-tab__badge" id="col-badge-mine">0</span>
        </button>
        <button class="oc-tab oc-tab--md oc-tab-variant-secondary" role="tab" aria-selected="false" id="col-tab-shared" data-filter="reader">
          <i data-icon="col-people"></i> <span data-i18n="list.tabReader">Reader</span> <span class="oc-tab__badge" id="col-badge-shared">0</span>
        </button>
      </div>
    </div>
    </div>
  </div>

  <!-- Controls row -->
  <div class="lq-col-controls">
    <!-- View toggle -->
    <div class="oc-toggle-group oc-toggle-group--single">
      <div class="oc-toggle-group__items">
        <button class="oc-toggle oc-toggle--small oc-toggle--unique oc-toggle--icon-only" aria-pressed="true" data-i18n-attr="aria-label:common.gridView" aria-label="Grid view" id="col-view-grid">
          <i data-icon="col-grid"></i>
        </button>
        <button class="oc-toggle oc-toggle--small oc-toggle--unique oc-toggle--icon-only" aria-pressed="false" data-i18n-attr="aria-label:common.listView" aria-label="List view" id="col-view-list">
          <i data-icon="col-list"></i>
        </button>
      </div>
    </div>

    <!-- Search bar -->
    <div class="oc-sb oc-search-bar oc-sb-size-md oc-sb--default oc-sb--empty" role="search">
      <span class="oc-sb-icon oc-sb__icon-search" aria-hidden="true"><i data-icon="suggestion-search"></i></span>
      <input class="oc-sb-input oc-sb__input" type="text" data-i18n-attr="placeholder:list.searchPlaceholder" placeholder="Search workspace..." id="col-search-input">
      <button class="oc-sb-clear lq-col-sb-clear" id="col-search-clear" data-i18n-attr="aria-label:common.clearSearch" aria-label="Clear search"><i data-icon="chip-close"></i></button>
    </div>

    <div class="lq-col-selbar" id="col-selbar" hidden>
      <span class="lq-col-selbar__count" id="col-selbar-count" data-i18n="list.selectedCount" data-i18n-count="0">0 selected</span>
      <button class="lq-btn lq-btn--secondary lq-btn--sm" id="col-sel-all" data-i18n="common.selectAll">Select All</button>
      <button class="lq-btn lq-btn--secondary lq-btn--secondary-danger lq-btn--sm" id="col-sel-delete" disabled><i data-icon="col-trash"></i> <span data-i18n="common.delete">Delete</span></button>
    </div>
    <button class="lq-btn lq-btn--tertiary-neutral lq-btn--sm lq-col-sel-group" id="col-select-btn" data-i18n="common.select">Select</button>
  </div>

  <!-- Loading / error states for the initial GET .../container fetch -->
  <div class="lq-col-loading" id="col-grid-loading" hidden data-i18n="list.loading">Loading workspaces\u2026</div>
  <div class="lq-col-loading lq-col-loading--error" id="col-grid-error" hidden>
    <span id="col-grid-error-message" data-i18n="list.loadError">Couldn't load workspaces.</span>
    <button class="lq-btn lq-btn--secondary lq-btn--sm" id="col-grid-retry" data-i18n="common.retry">Retry</button>
  </div>
  <div class="lq-inline-error" id="col-refresh-error" role="alert" hidden></div>

  <!-- Collection grid (populated by JS from the container list response) -->
  <div class="lq-col-grid oc-scrollable" id="col-grid"></div>

  <!-- Collection list view (populated lazily on first switch) -->
  <div class="lq-col-list oc-scrollable" id="col-list" hidden></div>
</div><!-- /.lq-collections-view -->

<!-- \u2500\u2500 Collection detail view \u2500\u2500 -->
<div id="col-detail-view" class="lq-col-detail-view oc-scrollable" hidden>

  <!-- Header -->
  <div class="lq-cdv-header">
    <button class="lq-btn lq-btn--tertiary-neutral lq-btn--md lq-btn--icon" id="col-detail-back" data-i18n-attr="aria-label:detail.back" aria-label="Back to workspaces">
      <i data-icon="col-arrow-left"></i>
    </button>
    <h1 class="lq-cdv-title" id="col-detail-title"></h1>
    <div class="lq-cdv-actions">
      <button class="lq-btn lq-btn--secondary lq-btn--secondary-danger lq-btn--md" id="col-detail-delete">
        <i data-icon="col-trash"></i> <span data-i18n="common.delete">Delete</span>
      </button>
      <button class="lq-btn lq-btn--secondary lq-btn--md" id="col-detail-share">
        <i data-icon="menu-share"></i> <span data-i18n="share.title">Manage access</span>
      </button>
      <button class="lq-btn lq-btn--secondary lq-btn--md" id="col-detail-edit">
        <i data-icon="edit-reg"></i> <span data-i18n="common.edit">Edit</span>
      </button>
      <button class="lq-btn lq-btn--secondary lq-btn--md lq-btn--icon" id="col-detail-refresh" data-i18n-attr="aria-label:common.refresh" aria-label="Refresh">
        <i data-icon="ut-sync"></i>
      </button>
    </div>
    <button class="lq-btn lq-btn--tertiary-neutral lq-btn--md lq-btn--icon" id="cdv-more-btn" data-i18n-attr="aria-label:common.moreOptions" aria-label="More options">
      <i data-icon="ellipsis-reg"></i>
    </button>
  </div>

  <!-- Description + tags -->
  <p class="lq-cdv-desc" id="col-detail-desc"></p>
  <p class="lq-cdv-tags" id="col-detail-tags"></p>

  <!-- Controls row (reuse lq-col-controls) -->
  <div class="lq-col-controls lq-cdv-controls">
    <button class="lq-btn lq-btn--primary lq-btn--md" id="col-detail-upload">
      <i data-icon="menu-upload"></i> <span data-i18n="detail.upload">Upload</span>
    </button>
    <div class="lq-cdv-controls-rest">
    <div class="oc-toggle-group oc-toggle-group--single">
      <div class="oc-toggle-group__items">
        <button class="oc-toggle oc-toggle--small oc-toggle--unique oc-toggle--icon-only" aria-pressed="true" data-i18n-attr="aria-label:common.gridView" aria-label="Grid view" id="col-detail-view-grid">
          <i data-icon="col-grid"></i>
        </button>
        <button class="oc-toggle oc-toggle--small oc-toggle--unique oc-toggle--icon-only" aria-pressed="false" data-i18n-attr="aria-label:common.listView" aria-label="List view" id="col-detail-view-list">
          <i data-icon="col-list"></i>
        </button>
      </div>
    </div>
    <div class="oc-sb oc-search-bar oc-sb-size-md oc-sb--default oc-sb--empty" role="search">
      <span class="oc-sb-icon oc-sb__icon-search" aria-hidden="true"><i data-icon="suggestion-search"></i></span>
      <input class="oc-sb-input oc-sb__input" type="text" data-i18n-attr="placeholder:detail.searchPlaceholder" placeholder="Search files..." id="col-detail-search">
      <button class="oc-sb-clear lq-col-sb-clear" id="col-detail-search-clear" data-i18n-attr="aria-label:common.clearSearch" aria-label="Clear search"><i data-icon="chip-close"></i></button>
    </div>
    <div class="lq-cdv-selbar" id="col-detail-selbar" hidden>
      <button class="lq-btn lq-btn--secondary lq-btn--sm" id="col-detail-sel-all" data-i18n="common.selectAll">Select All</button>
      <button class="lq-btn lq-btn--secondary lq-btn--secondary-danger lq-btn--sm" id="col-detail-sel-delete" disabled><i data-icon="col-trash"></i> <span data-i18n="common.delete">Delete</span></button>
    </div>
    <button class="lq-btn lq-btn--tertiary-neutral lq-btn--sm lq-col-sel-group" id="col-detail-select-btn" data-i18n="common.select">Select</button>
    </div>
  </div>

  <!-- File count -->
  <p class="lq-cdv-count" id="col-detail-count"></p>
  <div class="lq-inline-error" id="col-detail-refresh-error" role="alert" hidden></div>

  <!-- Empty state -->
  <div class="lq-cdv-empty" id="col-detail-empty" hidden>
    <div class="lq-cdv-empty__icon"><i data-icon="col-folder-teal"></i></div>
    <h5 class="lq-cdv-empty__title" data-i18n="detail.emptyTitle">No documents yet</h5>
    <p class="lq-cdv-empty__sub" data-i18n="detail.emptySubtitle">Documents added to this workspace will appear here</p>
  </div>

  <!-- Loading / error states for GET .../container/{id}/documents -->
  <div class="lq-col-loading" id="col-detail-docs-loading" hidden data-i18n="detail.docsLoading">Loading documents\u2026</div>
  <div class="lq-col-loading lq-col-loading--error" id="col-detail-docs-error" hidden>
    <span id="col-detail-docs-error-message" data-i18n="detail.docsLoadError">Couldn't load documents.</span>
    <button class="lq-btn lq-btn--secondary lq-btn--sm" id="col-detail-docs-retry" data-i18n="common.retry">Retry</button>
  </div>

  <!-- Document grid -->
  <div class="lq-cdv-grid oc-scrollable" id="col-detail-grid"></div>

  <!-- Document list -->
  <div class="lq-doc-list oc-scrollable" id="col-detail-list" hidden></div>

</div><!-- /.lq-col-detail-view -->

<!-- \u2500\u2500 Resize handle for collection doc preview (left edge of the panel) \u2500\u2500 -->
<div id="col-doc-resize-handle" class="lq-resize-handle"></div>

<!-- \u2500\u2500 Collection document preview panel \u2500\u2500 -->
<div id="col-doc-preview" class="lq-detail-panel lq-cdp">
  <div class="lq-dp-doc-preview">
    <div class="lq-dp-doc-preview__header">
      <div class="lq-dp-doc-preview__title-row">
        <a class="oc-link oc-link-size-medium lq-dp-doc-preview__title-link" id="cdp-preview-link" href="#" target="_blank" rel="noopener">
          <span class="oc-link-icon-left"><i id="cdp-preview-icon"></i></span>
          <span class="oc-link-label" id="cdp-preview-title"></span>
          <span class="oc-link-icon-right"><i data-icon="link-external"></i></span>
        </a>
        <div class="lq-dp-doc-preview__actions">
          <button class="lq-btn lq-btn--sm lq-btn--icon lq-btn--tertiary-neutral" id="btn-cdp-close" data-i18n-attr="aria-label:preview.close" aria-label="Close preview">
            <i data-icon="panel-close"></i>
          </button>
        </div>
      </div>
      <div class="lq-dp-doc-preview__meta">
        <div class="lq-dp-doc-preview__meta-row">
          <i data-icon="fp-date"></i>
          <span class="lq-dp-doc-preview__meta-label" data-i18n="preview.dateLabel">Date:</span>
          <span id="cdp-preview-date"></span>
        </div>
        <div class="lq-dp-doc-preview__meta-row">
          <i data-icon="fp-sources"></i>
          <span class="lq-dp-doc-preview__meta-label" data-i18n="preview.sourceLabel">Source:</span>
          <span id="cdp-preview-source"></span>
        </div>
      </div>
      <div class="lq-dp-doc-preview__search-row">
        <div class="oc-sb oc-search-bar oc-sb-size-md oc-sb--medium oc-sb--label oc-sb--default oc-sb--empty" role="search">
          <span class="oc-sb-icon oc-sb__icon-search" aria-hidden="true"><i data-icon="suggestion-search"></i></span>
          <input class="oc-sb-input oc-sb__input" type="text" data-i18n-attr="placeholder:preview.findPlaceholder" placeholder="Find text..." id="cdp-search-input">
          <div class="lq-dp-search-nav" id="cdp-search-nav">
            <div class="lq-dp-search-nav__arrows">
              <button class="lq-dp-search-nav__btn" id="cdp-search-nav-prev" data-i18n-attr="aria-label:preview.previousResult" aria-label="Previous result">
                <i data-icon="chevron-up"></i>
              </button>
              <button class="lq-dp-search-nav__btn" id="cdp-search-nav-next" data-i18n-attr="aria-label:preview.nextResult" aria-label="Next result">
                <i data-icon="chevron-down"></i>
              </button>
            </div>
            <span class="lq-dp-search-nav__count" id="cdp-search-nav-count">1/1</span>
            <button class="lq-dp-search-nav__btn lq-dp-search-nav__close" id="cdp-search-nav-close" data-i18n-attr="aria-label:common.clearSearch" aria-label="Clear search">
              <i data-icon="chip-close"></i>
            </button>
          </div>
        </div>
        <button class="lq-btn lq-btn--md lq-btn--secondary" id="btn-cdp-ask-agent">
          <i data-icon="dp-chat"></i>
          <span data-i18n="preview.askFollowUp">Ask follow-up</span>
        </button>
        <div class="lq-dp-doc-preview__doc-controls">
          <button class="lq-btn lq-btn--md lq-btn--icon lq-btn--tertiary-neutral" id="cdp-zoom-out" data-i18n-attr="aria-label:preview.zoomOut" aria-label="Zoom out"><i data-icon="zoom-out"></i></button>
          <button class="lq-btn lq-btn--md lq-btn--icon lq-btn--tertiary-neutral" id="cdp-zoom-in" data-i18n-attr="aria-label:preview.zoomIn" aria-label="Zoom in"><i data-icon="zoom-in"></i></button>
          <!-- Page navigation only drives the locally-built pages of the passages
               path; a server-rendered preview paginates itself inside its frame,
               so views/doc-preview.ts hides this group there. -->
          <div class="lq-dp-doc-preview__page-nav" id="cdp-page-nav">
            <div class="oc-separator oc-separator--vertical oc-separator--spacing-sm" role="separator" aria-hidden="true"></div>
            <button class="lq-btn lq-btn--md lq-btn--icon lq-btn--tertiary-neutral" id="cdp-prev-page" data-i18n-attr="aria-label:preview.previousPage" aria-label="Previous page"><i data-icon="chevron-up"></i></button>
            <button class="lq-btn lq-btn--md lq-btn--icon lq-btn--tertiary-neutral" id="cdp-next-page" data-i18n-attr="aria-label:preview.nextPage" aria-label="Next page"><i data-icon="chevron-down"></i></button>
            <div class="oc-input-wrap oc-input-size-sm lq-dp-doc-preview__page-ctrl">
              <input class="oc-input-control lq-dp-doc-preview__page-current" type="text" inputmode="numeric" pattern="[0-9]*" value="1" id="cdp-page-current" data-i18n-attr="aria-label:preview.currentPage" aria-label="Current page">
              <span class="lq-dp-doc-preview__page-sep" aria-hidden="true">/</span>
              <span class="lq-dp-doc-preview__page-total" id="cdp-page-total">10</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="lq-dp-doc-preview__body" id="cdp-preview-body">
      <!-- Passages sidebar \u2014 only shown when preview is opened from a message resources item -->
      <div class="lq-passages-sidebar" id="cdp-passages-sidebar" hidden>
        <div class="lq-passages-sidebar__full">
          <div class="lq-passages-sidebar__header">
            <span class="lq-passages-sidebar__title" data-i18n="preview.passages">Passages</span>
            <button class="lq-btn lq-btn--sm lq-btn--icon lq-btn--tertiary-neutral" id="cdp-passages-collapse" data-i18n-attr="aria-label:preview.collapsePassages" aria-label="Collapse passages">
              <i data-icon="collapse-sidebar"></i>
            </button>
          </div>
          <div class="lq-passages-sidebar__list" id="cdp-passages-list"></div>
        </div>
        <div class="lq-passages-sidebar__collapsed-strip">
          <button class="lq-btn lq-btn--sm lq-btn--icon lq-btn--tertiary-neutral" id="cdp-passages-expand" data-i18n-attr="aria-label:preview.expandPassages;title:preview.passages" aria-label="Expand passages" title="Passages">
            <i data-icon="expand-sidebar"></i>
          </button>
        </div>
      </div>
      <div class="lq-dp-doc-preview__pages" id="cdp-preview-pages"></div>
    </div>
  </div>
</div><!-- /.lq-cdp -->

<!-- \u2500\u2500 Delete collection modal \u2500\u2500 -->
<div class="lq-confirm-backdrop" id="col-delete-backdrop" hidden></div>
<div class="lq-confirm-modal" id="col-delete-modal" hidden role="dialog" aria-modal="true" aria-labelledby="col-delete-modal-title">
  <div class="lq-confirm-header">
    <span class="lq-confirm-title" id="col-delete-modal-title" data-i18n="list.deleteTitle">Delete workspace?</span>
    <button class="lq-btn lq-btn--tertiary-neutral lq-btn--sm lq-btn--icon" id="btn-col-delete-close" data-i18n-attr="aria-label:common.close" aria-label="Close"><i data-icon="panel-close"></i></button>
  </div>
  <div class="lq-confirm-body">
    <!-- Filled by setDeleteWarning() (internal/dom-utils.ts): the subject is
         interpolated INTO the sentence rather than prepended to it, because
         languages put it in different places. -->
    <p class="lq-confirm-desc" id="col-delete-desc"></p>
    <div class="lq-inline-error" id="col-delete-error" hidden></div>
  </div>
  <div class="lq-confirm-footer">
    <button class="lq-btn lq-btn--secondary lq-btn--md" id="btn-col-delete-cancel" data-i18n="common.cancel">Cancel</button>
    <button class="lq-btn lq-btn--danger lq-btn--md" id="btn-col-delete-confirm" data-i18n="common.delete">Delete</button>
  </div>
</div>

<!-- \u2500\u2500 Delete document(s) modal \u2500\u2500 -->
<div class="lq-confirm-backdrop" id="doc-delete-backdrop" hidden></div>
<div class="lq-confirm-modal" id="doc-delete-modal" hidden role="dialog" aria-modal="true" aria-labelledby="doc-delete-title">
  <div class="lq-confirm-header">
    <span class="lq-confirm-title" id="doc-delete-title" data-i18n="detail.deleteDocTitle">Delete document?</span>
    <button class="lq-btn lq-btn--tertiary-neutral lq-btn--sm lq-btn--icon" id="btn-doc-delete-close" data-i18n-attr="aria-label:common.close" aria-label="Close"><i data-icon="panel-close"></i></button>
  </div>
  <div class="lq-confirm-body">
    <p class="lq-confirm-desc" id="doc-delete-desc"></p>
    <div class="lq-inline-error" id="doc-delete-error" hidden></div>
  </div>
  <div class="lq-confirm-footer">
    <button class="lq-btn lq-btn--secondary lq-btn--md" id="btn-doc-delete-cancel" data-i18n="common.cancel">Cancel</button>
    <button class="lq-btn lq-btn--danger lq-btn--md" id="btn-doc-delete-confirm" data-i18n="common.delete">Delete</button>
  </div>
</div>

<!-- \u2500\u2500 Collection detail mobile "more" menu \u2500\u2500 -->
<div class="lq-doc-menu" id="cdv-more-menu" hidden>
  <button class="oc-list-item oc-list-item-menu oc-list-item-md" id="cdv-more-share">
    <div class="oc-list-item-left">
      <span class="oc-list-item-icon"><i data-icon="menu-share"></i></span>
      <div class="oc-list-item-text-block"><span class="oc-list-item-text" data-i18n="share.title">Manage access</span></div>
    </div>
  </button>
  <button class="oc-list-item oc-list-item-menu oc-list-item-md" id="cdv-more-edit">
    <div class="oc-list-item-left">
      <span class="oc-list-item-icon"><i data-icon="edit-reg"></i></span>
      <div class="oc-list-item-text-block"><span class="oc-list-item-text" data-i18n="common.edit">Edit</span></div>
    </div>
  </button>
  <button class="oc-list-item oc-list-item-menu oc-list-item-md" id="cdv-more-refresh">
    <div class="oc-list-item-left">
      <span class="oc-list-item-icon"><i data-icon="ut-sync"></i></span>
      <div class="oc-list-item-text-block"><span class="oc-list-item-text" data-i18n="common.refresh">Refresh</span></div>
    </div>
  </button>
  <button class="oc-list-item oc-list-item-menu oc-list-item-md lq-list-item--danger" id="cdv-more-delete">
    <div class="oc-list-item-left">
      <span class="oc-list-item-icon"><i data-icon="col-trash"></i></span>
      <div class="oc-list-item-text-block"><span class="oc-list-item-text" data-i18n="common.delete">Delete</span></div>
    </div>
  </button>
</div>

<!-- \u2500\u2500 Manage access modal \u2500\u2500 -->
<div class="lq-confirm-backdrop" id="col-share-backdrop" hidden></div>
<div class="lq-confirm-modal lq-col-share-modal" id="col-share-modal" hidden role="dialog" aria-modal="true" aria-labelledby="col-share-modal-title">
  <div class="lq-confirm-header">
    <span class="lq-confirm-title" id="col-share-modal-title" data-i18n="share.title">Manage access</span>
    <button class="lq-btn lq-btn--tertiary-neutral lq-btn--sm lq-btn--icon" id="btn-col-share-close" data-i18n-attr="aria-label:common.close" aria-label="Close"><i data-icon="panel-close"></i></button>
  </div>
  <div class="lq-col-share-member-portal" id="col-share-member-portal" hidden role="listbox"></div>
  <div class="lq-confirm-body lq-col-share-body">
    <div class="lq-share-agent-row">
      <span class="lq-share-agent-name" id="col-share-col-name"></span>
    </div>
    <div class="oc-input-field">
      <label class="oc-input-label" for="col-share-search-input" data-i18n="share.addPeople">Add people</label>
      <div class="lq-col-share-search-wrap">
        <div class="lq-col-share-input-anchor">
          <div class="lq-tag-input" id="col-share-tag-wrap">
            <input class="lq-tag-input__input" id="col-share-search-input" type="text" autocomplete="off" spellcheck="false" data-i18n-attr="placeholder:share.searchPlaceholder;aria-label:share.searchUsers" placeholder="Search by name or email\u2026" aria-label="Search users" role="combobox" aria-autocomplete="list" aria-expanded="false" aria-controls="col-share-dropdown" />
            <div class="lq-col-share-perm-wrap">
              <button type="button" class="lq-btn lq-btn--sm lq-btn--tertiary-neutral lq-col-share-perm-btn" id="col-share-perm-btn" aria-haspopup="listbox" aria-expanded="false">
                <span class="lq-col-share-perm-icon"><i data-icon="eye"></i></span>
                <span id="col-share-perm-label" data-i18n="share.reader">Reader</span>
                <i data-icon="chevron-down"></i>
              </button>
              <div class="lq-col-share-perm-dropdown" id="col-share-perm-dropdown" hidden role="listbox">
                <button class="oc-list-item oc-list-item-menu oc-list-item-md oc-list-item-selected" data-role="reader" role="option" type="button">
                  <div class="oc-list-item-left">
                    <i data-icon="eye"></i>
                    <div class="oc-list-item-text-block">
                      <span class="oc-list-item-text" data-i18n="share.reader">Reader</span>
                      <span class="oc-list-item-subtext" data-i18n="share.readerDescription">Can view and use the workspace.</span>
                    </div>
                  </div>
                </button>
                <button class="oc-list-item oc-list-item-menu oc-list-item-md" data-role="owner" role="option" type="button">
                  <div class="oc-list-item-left">
                    <i data-icon="crown"></i>
                    <div class="oc-list-item-text-block">
                      <span class="oc-list-item-text" data-i18n="share.owner">Owner</span>
                      <span class="oc-list-item-subtext" data-i18n="share.ownerDescription">Can add or remove people, change roles, and manage the workspace.</span>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
          <div class="lq-col-share-dropdown" id="col-share-dropdown" hidden role="listbox"></div>
        </div>
        <button class="lq-btn lq-btn--primary lq-btn--md" id="btn-col-share-invite" disabled data-i18n="common.add">Add</button>
      </div>
    </div>
    <p class="lq-col-share-access-count" id="col-share-access-count"></p>
    <div class="lq-col-share-access-list oc-scrollable" id="col-share-access-list"></div>
    <div class="lq-inline-error" id="col-share-error" hidden></div>
    <div class="lq-share-notice">
      <i data-icon="share-info"></i>
      <p class="lq-share-notice-text" data-i18n="share.accessNotice">Some documents in this workspace may not be accessible to all shared users. Documents from shared drives or external sources remain subject to their original access permissions. Locally uploaded files from your personal device will always be accessible through the shared workspace.</p>
    </div>
  </div>
</div>

<!-- \u2500\u2500 Upload Documents modal \u2500\u2500 -->
<div class="lq-confirm-backdrop" id="col-upload-backdrop" hidden></div>
<div class="lq-confirm-modal lq-upload-modal" id="col-upload-modal" hidden role="dialog" aria-modal="true" aria-labelledby="col-upload-modal-title">
  <div class="lq-confirm-header">
    <span class="lq-confirm-title" id="col-upload-modal-title" data-i18n="upload.modalTitle">Upload Documents</span>
    <button class="lq-btn lq-btn--tertiary-neutral lq-btn--sm lq-btn--icon" id="btn-col-upload-close" data-i18n-attr="aria-label:common.close" aria-label="Close"><i data-icon="panel-close"></i></button>
  </div>
  <div class="lq-confirm-body lq-upload-body">
    <div class="lq-upload-dropzone" id="col-upload-dropzone" role="button" tabindex="0" data-i18n-attr="aria-label:upload.dropzoneLabel" aria-label="Drop zone \u2014 click to browse files">
      <input type="file" id="col-upload-input" multiple hidden>
      <!-- Split in two so the "browse" part keeps its own styling; each half is
           translated on its own rather than carrying markup in the catalog. -->
      <p class="lq-upload-dropzone__main"><span data-i18n="upload.dropPrefix">Drop your files here, or </span><span class="lq-upload-dropzone__browse" data-i18n="upload.browse">click to browse</span></p>
    </div>
    <div class="lq-upload-error" id="col-upload-error" hidden></div>
    <div class="lq-upload-file-list oc-scrollable" id="col-upload-file-list" hidden></div>
  </div>
  <div class="lq-confirm-footer">
    <button class="lq-btn lq-btn--secondary lq-btn--md" id="btn-col-upload-cancel" data-i18n="common.cancel">Cancel</button>
    <button class="lq-btn lq-btn--primary lq-btn--md" id="btn-col-upload-confirm" disabled data-i18n="detail.upload">Upload</button>
  </div>
</div>

<!-- \u2500\u2500 Edit collection modal \u2500\u2500 -->
<div class="lq-confirm-backdrop" id="col-edit-backdrop" hidden></div>
<div class="lq-confirm-modal lq-col-edit-modal" id="col-edit-modal" hidden role="dialog" aria-modal="true" aria-labelledby="col-edit-modal-title">
  <div class="lq-confirm-header">
    <span class="lq-confirm-title" id="col-edit-modal-title" data-i18n="edit.editTitle">Edit workspace</span>
    <button class="lq-btn lq-btn--tertiary-neutral lq-btn--sm lq-btn--icon" id="btn-col-edit-close" data-i18n-attr="aria-label:common.close" aria-label="Close"><i data-icon="panel-close"></i></button>
  </div>
  <div class="lq-confirm-body lq-col-edit-body">
    <div class="oc-input-field">
      <label class="oc-input-label" for="col-edit-title"><span data-i18n="edit.nameLabel">Title</span> <span class="oc-input-label__tag oc-input-label__tag--required" data-i18n="common.required">Required</span></label>
      <div class="oc-input-wrap oc-input-size-md" id="col-edit-title-wrap">
        <input class="oc-input-control" id="col-edit-title" type="text" autocomplete="off" spellcheck="false" maxlength="120" required />
      </div>
      <p class="oc-input-hint oc-input-hint-error" id="col-edit-title-hint" hidden data-i18n="edit.nameRequired">Title is required</p>
    </div>
    <div class="oc-input-field">
      <label class="oc-input-label" for="col-edit-desc" data-i18n="edit.descriptionLabel">Description</label>
      <div class="oc-input-wrap oc-input-wrap--textarea lq-col-edit-desc-wrap" id="col-edit-desc-wrap">
        <textarea class="oc-input-control" id="col-edit-desc" rows="3" maxlength="300" data-i18n-attr="placeholder:edit.descriptionPlaceholder" placeholder="Describe this workspace\u2026"></textarea>
        <span class="oc-input-counter" id="col-edit-desc-counter">0/300</span>
      </div>
    </div>
    <div class="oc-input-field">
      <label class="oc-input-label" for="col-edit-tags-input" data-i18n="edit.tagsLabel">Tags</label>
      <div class="lq-tag-input" id="col-edit-tag-wrap">
        <input class="lq-tag-input__input" id="col-edit-tags-input" type="text" autocomplete="off" spellcheck="false" data-i18n-attr="placeholder:edit.tagsPlaceholder;aria-label:edit.addTag" placeholder="Type a tag and press comma\u2026" aria-label="Add tag" />
      </div>
      <p class="oc-input-hint" data-i18n="edit.tagsHint">Press comma or Enter to add a tag \xB7 Backspace to remove the last one</p>
    </div>
    <div class="oc-input-field" id="col-edit-share-field">
      <label class="oc-input-label" for="col-edit-share-input" data-i18n="edit.shareLabel">Share with</label>
      <div class="lq-col-share-search-wrap">
        <div class="lq-col-share-input-anchor">
          <div class="lq-tag-input" id="col-edit-share-wrap">
            <input class="lq-tag-input__input" id="col-edit-share-input" type="text" autocomplete="off" spellcheck="false" role="combobox" aria-autocomplete="list" aria-expanded="false" aria-controls="col-edit-share-dropdown" data-i18n-attr="placeholder:share.searchPlaceholder;aria-label:share.searchUsers" placeholder="Search by name or email\u2026" aria-label="Search users" />
            <div class="lq-col-share-perm-wrap">
              <button type="button" class="lq-btn lq-btn--sm lq-btn--tertiary-neutral lq-col-share-perm-btn" id="col-edit-share-perm-btn" aria-haspopup="listbox" aria-expanded="false">
                <span class="lq-col-share-perm-icon"><i data-icon="eye"></i></span>
                <span id="col-edit-share-perm-label" data-i18n="share.reader">Reader</span>
                <i data-icon="chevron-down"></i>
              </button>
              <div class="lq-col-share-perm-dropdown" id="col-edit-share-perm-dropdown" hidden role="listbox">
                <button class="oc-list-item oc-list-item-menu oc-list-item-md" data-role="reader" role="option" type="button">
                  <div class="oc-list-item-left">
                    <i data-icon="eye"></i>
                    <div class="oc-list-item-text-block">
                      <span class="oc-list-item-text" data-i18n="share.reader">Reader</span>
                      <span class="oc-list-item-subtext" data-i18n="share.readerDescription">Can view and use the workspace.</span>
                    </div>
                  </div>
                </button>
                <button class="oc-list-item oc-list-item-menu oc-list-item-md" data-role="owner" role="option" type="button">
                  <div class="oc-list-item-left">
                    <i data-icon="crown"></i>
                    <div class="oc-list-item-text-block">
                      <span class="oc-list-item-text" data-i18n="share.owner">Owner</span>
                      <span class="oc-list-item-subtext" data-i18n="share.ownerDescription">Can add or remove people, change roles, and manage the workspace.</span>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
          <div class="lq-col-share-dropdown" id="col-edit-share-dropdown" hidden role="listbox"></div>
        </div>
      </div>
      <p class="oc-input-hint" data-i18n="edit.shareHint">Search a user to grant access \xB7 click a role chip to switch between Owner and Reader</p>
    </div>
    <div class="lq-inline-error" id="col-edit-error" hidden></div>
  </div>
  <div class="lq-confirm-footer">
    <button class="lq-btn lq-btn--secondary lq-btn--md" id="btn-col-edit-cancel" data-i18n="common.cancel">Cancel</button>
    <button class="lq-btn lq-btn--primary lq-btn--md" id="btn-col-edit-save" data-i18n="common.save">Save</button>
  </div>
</div>

<!-- Upload progress tracker -->
<div id="lq-upload-tracker" class="lq-upload-tracker" hidden>
  <!-- Minimized peek strip (slides up from below viewport) -->
  <div class="lq-upload-tracker__peek" id="ut-peek">
    <span class="lq-upload-tracker__peek-spinner"></span>
    <span class="lq-upload-tracker__peek-check-icon"><i data-icon="ut-check"></i></span>
    <span class="lq-upload-tracker__peek-error-icon"><i data-icon="ut-error"></i></span>
    <span class="lq-upload-tracker__peek-text" id="ut-peek-text"></span>
    <span class="lq-upload-tracker__peek-hint" data-i18n="tracker.clickToRestore">Click to restore</span>
  </div>
  <!-- Header: always visible, neutral bg, border-bottom -->
  <div class="lq-upload-tracker__header">
    <span class="lq-upload-tracker__spinner"></span>
    <span class="lq-upload-tracker__done-icon"><i data-icon="ut-check"></i></span>
    <div class="lq-upload-tracker__info">
      <span class="lq-upload-tracker__name" id="ut-col-name"></span>
      <span class="lq-upload-tracker__count" id="ut-file-count"></span>
    </div>
    <div class="lq-upload-tracker__btns">
      <span class="lq-upload-tracker__pin-hint" data-i18n="tracker.clickToOpen">Click to open</span>
      <button class="lq-btn lq-btn--tertiary-neutral lq-btn--sm lq-btn--icon" id="ut-collapse-btn" data-i18n-attr="aria-label:common.expand" aria-label="Expand"><i data-icon="chevron-down"></i></button>
      <button class="lq-btn lq-btn--tertiary-neutral lq-btn--sm lq-btn--icon" id="ut-dismiss-btn" data-i18n-attr="aria-label:common.close" aria-label="Close"><i data-icon="panel-close"></i></button>
    </div>
  </div>
  <!-- Connection / session banner. Driven by onConnectionChange() in
       views/upload-tracker.ts; sits under the header so it is visible in both
       the collapsed and the expanded body states.
       a11y: role="status" announces the phase and the retry number, which
       change once per attempt. The countdown line ticks every second, so it is
       aria-hidden - a screen reader reading "Next try in 0:11 / 0:10 / 0:09"
       over and over would drown out everything else on the page. -->
  <div class="lq-ut-conn" id="ut-conn" hidden role="status">
    <span class="lq-ut-conn__icon"><i data-icon="ut-error"></i></span>
    <div class="lq-ut-conn__text">
      <span class="lq-ut-conn__title" id="ut-conn-title"></span>
      <span class="lq-ut-conn__detail" id="ut-conn-detail"></span>
      <span class="lq-ut-conn__countdown" id="ut-conn-countdown" aria-hidden="true"></span>
    </div>
    <button class="lq-btn lq-btn--secondary lq-btn--sm lq-ut-conn__retry" id="ut-conn-retry" hidden data-i18n="common.retry">Retry</button>
  </div>
  <!-- Collapsed body: compact inline stats (default) -->
  <div class="lq-upload-tracker__inline-body" id="ut-inline-body">
    <div class="lq-upload-tracker__inline-stats">
      <span class="lq-upload-tracker__inline-stat" id="ut-inline-upload-stat" hidden>
        <i data-icon="ut-upload"></i>
        <span id="ut-lbl-upload"></span><span class="lq-doc-status__dots"><span></span><span></span><span></span></span>
      </span>
      <span class="lq-upload-tracker__inline-sep" id="ut-inline-sep" hidden></span>
      <span class="lq-upload-tracker__inline-stat" id="ut-inline-index-stat" hidden>
        <i data-icon="ut-sync"></i>
        <span id="ut-lbl-index"></span><span class="lq-doc-status__dots"><span></span><span></span><span></span></span>
      </span>
      <span class="lq-upload-tracker__inline-sep" id="ut-inline-sep-2" hidden></span>
      <span class="lq-upload-tracker__inline-stat lq-upload-tracker__inline-stat--done" id="ut-inline-done-stat" hidden>
        <i data-icon="ut-check"></i>
        <span id="ut-lbl-done"></span>
      </span>
      <span class="lq-upload-tracker__inline-sep" id="ut-inline-sep-3" hidden></span>
      <span class="lq-upload-tracker__inline-stat lq-upload-tracker__inline-stat--error" id="ut-inline-error-stat" hidden>
        <i data-icon="ut-error"></i>
        <span id="ut-lbl-error"></span>
      </span>
    </div>
  </div>
  <!-- Expanded body: rendered dynamically by _uploadTracker -->
  <div class="lq-upload-tracker__detail-body" id="ut-detail-body" hidden></div>
</div>
`;function dn(){let r=document.createElement(`template`);return r.innerHTML=ut,r}var vr=`/* GENERATED by scripts/generate-css.mjs \u2014 do not edit by hand. */
/* Vendored from lexiq-prototype scss/spacing.scss \u2014 :root rewritten to :host */\r
:host {\r
  --space-3xs: 4px;\r
  --space-2xs: 8px;\r
  --space-xs:  12px;\r
  --space-md:  16px;\r
  --space-lg:  20px;\r
  --space-xl:  24px;\r
  --space-2xl: 32px;\r
  --space-3xl: 36px;\r
  --space-4xl: 40px;\r
}\r

/* Vendored from lexiq-prototype scss/radius.scss \u2014 :root rewritten to :host */\r
:host {\r
  --radius-xs:      4px;\r
  --radius-sm:      8px;\r
  --radius-md:      12px;\r
  --radius-lg:      16px;\r
  --radius-xl:      20px;\r
  --radius-2xl:     24px;\r
  --radius-3xl:     28px;\r
  --radius-4xl:     32px;\r
  --radius-rounded: 9999px;\r
}\r

/* Vendored from lexiq-prototype scss/row-height.scss \u2014 :root rewritten to :host */\r
:host {\r
  --row-height-xs: 18px;\r
  --row-height-sm: 24px;\r
  --row-height-md: 36px;\r
  --row-height-l:  44px;\r
}\r

/* Vendored from lexiq-prototype scss/typography.scss \u2014 :root rewritten to :host.\r
   Utility classes (.text-h1 etc.) kept for fidelity; harmless inside a Shadow Root. */\r
:host {\r
  --text-h1-size:        24px;\r
  --text-h1-line-height: 31px;\r
  --text-h1-weight:      700;\r
\r
  --text-h2-size:        20px;\r
  --text-h2-line-height: 26px;\r
  --text-h2-weight:      400;\r
\r
  --text-h3-size:        18px;\r
  --text-h3-line-height: 24px;\r
  --text-h3-weight:      400;\r
\r
  --text-h4-size:        16px;\r
  --text-h4-line-height: 22px;\r
  --text-h4-weight:      700;\r
\r
  --text-h5-size:        16px;\r
  --text-h5-line-height: 22px;\r
  --text-h5-weight:      600;\r
\r
  --text-h6-size:        16px;\r
  --text-h6-line-height: 22px;\r
  --text-h6-weight:      400;\r
\r
  --text-p-base-bold-size:        14px;\r
  --text-p-base-bold-line-height: 18px;\r
  --text-p-base-bold-weight:      700;\r
\r
  --text-p-base-medium-size:        14px;\r
  --text-p-base-medium-line-height: 18px;\r
  --text-p-base-medium-weight:      600;\r
\r
  --text-p-base-regular-size:        14px;\r
  --text-p-base-regular-line-height: 18px;\r
  --text-p-base-regular-weight:      400;\r
\r
  --text-p-sm-bold-size:        12px;\r
  --text-p-sm-bold-line-height: 16px;\r
  --text-p-sm-bold-weight:      700;\r
\r
  --text-p-sm-medium-size:        12px;\r
  --text-p-sm-medium-line-height: 16px;\r
  --text-p-sm-medium-weight:      600;\r
\r
  --text-p-sm-regular-size:        12px;\r
  --text-p-sm-regular-line-height: 16px;\r
  --text-p-sm-regular-weight:      400;\r
\r
  --text-p-xs-bold-size:        11px;\r
  --text-p-xs-bold-line-height: 14px;\r
  --text-p-xs-bold-weight:      700;\r
\r
  --text-p-xs-medium-size:        11px;\r
  --text-p-xs-medium-line-height: 14px;\r
  --text-p-xs-medium-weight:      600;\r
\r
  --text-p-xs-regular-size:        11px;\r
  --text-p-xs-regular-line-height: 14px;\r
  --text-p-xs-regular-weight:      400;\r
}\r

/* Vendored from lexiq-prototype scss/theme.scss \u2014 primitive color palette. :root rewritten to :host */\r
:host {\r
\r
  /* \u2500\u2500 Sage \u2500\u2500 */\r
  --color-sage-50:  #f5f8f7;\r
  --color-sage-100: #e8f0ee;\r
  --color-sage-200: #d1e1dd;\r
  --color-sage-300: #a9c1b8;\r
  --color-sage-400: #7a9b95;\r
  --color-sage-500: #607c7f;\r
  --color-sage-600: #5d7374;\r
  --color-sage-700: #4f6162;\r
  --color-sage-800: #445556;\r
  --color-sage-900: #374648;\r
  --color-sage-950: #2d393a;\r
  --color-sage-975: #222d30;\r
\r
  /* \u2500\u2500 Almond \u2500\u2500 */\r
  --color-almond-50:  #f1f8f4;\r
  --color-almond-100: #dcefe3;\r
  --color-almond-200: #bbdfca;\r
  --color-almond-300: #8ec7a9;\r
  --color-almond-400: #5fa884;\r
  --color-almond-500: #3d8c69;\r
  --color-almond-600: #2c6f52;\r
  --color-almond-700: #235944;\r
  --color-almond-800: #1e4737;\r
  --color-almond-900: #193b2e;\r
  --color-almond-950: #0d211a;\r
\r
  /* \u2500\u2500 Pink \u2500\u2500 */\r
  --color-pink-50:  #fcf7fd;\r
  --color-pink-100: #faecfb;\r
  --color-pink-200: #efc9f3;\r
  --color-pink-300: #dbbade;\r
  --color-pink-400: #c9aacb;\r
  --color-pink-500: #b896bb;\r
  --color-pink-600: #a582ab;\r
  --color-pink-700: #926e9b;\r
  --color-pink-800: #7f5a8b;\r
  --color-pink-900: #6c467b;\r
  --color-pink-950: #4a325b;\r
\r
  /* \u2500\u2500 Green \u2500\u2500 */\r
  --color-green-50:  #f6faf5;\r
  --color-green-100: #e5eee3;\r
  --color-green-200: #c4d6c0;\r
  --color-green-300: #91b38b;\r
  --color-green-400: #709b67;\r
  --color-green-500: #4e8344;\r
  --color-green-600: #3e6936;\r
  --color-green-700: #2f4f29;\r
  --color-green-800: #1f341b;\r
  --color-green-900: #172714;\r
  --color-green-950: #101a0e;\r
\r
  /* \u2500\u2500 Orange \u2500\u2500 */\r
  --color-orange-50:  #fff6f1;\r
  --color-orange-100: #ffeee2;\r
  --color-orange-200: #ffddc6;\r
  --color-orange-300: #ffcba9;\r
  --color-orange-400: #ffba8d;\r
  --color-orange-500: #df884f;\r
  --color-orange-600: #bd6f3c;\r
  --color-orange-700: #98552a;\r
  --color-orange-800: #85461e;\r
  --color-orange-900: #753a13;\r
  --color-orange-950: #592a0b;\r
\r
  /* \u2500\u2500 Red \u2500\u2500 */\r
  --color-red-50:  #ffefef;\r
  --color-red-100: #ffdedf;\r
  --color-red-200: #ffbebf;\r
  --color-red-300: #ff9d9f;\r
  --color-red-400: #ff7d7f;\r
  --color-red-500: #d64a4c;\r
  --color-red-600: #ad3739;\r
  --color-red-700: #852527;\r
  --color-red-800: #701c1d;\r
  --color-red-900: #5c1214;\r
  --color-red-950: #47090a;\r
\r
  /* \u2500\u2500 Blue \u2500\u2500 */\r
  --color-blue-50:  #f1f6fa;\r
  --color-blue-100: #e2edf4;\r
  --color-blue-200: #c5dbea;\r
  --color-blue-300: #a9cadf;\r
  --color-blue-400: #8cb8d5;\r
  --color-blue-500: #5a87a4;\r
  --color-blue-600: #45677e;\r
  --color-blue-700: #2f4859;\r
  --color-blue-800: #253846;\r
  --color-blue-900: #1a2833;\r
  --color-blue-950: #101920;\r
\r
  /* \u2500\u2500 Gray \u2500\u2500 */\r
  --color-gray-50:  #fdfefe;\r
  --color-gray-100: #f9fafb;\r
  --color-gray-200: #eff2f6;\r
  --color-gray-300: #b9c4d5;\r
  --color-gray-400: #97a6be;\r
  --color-gray-500: #7685a2;\r
  --color-gray-600: #626c84;\r
  --color-gray-700: #4d5260;\r
  --color-gray-800: #36383e;\r
  --color-gray-900: #272b30;\r
  --color-gray-950: #171c1f;\r
\r
  /* \u2500\u2500 Yellow \u2500\u2500 */\r
  --color-yellow-50:  #fef8ed;\r
  --color-yellow-100: #FDF2DC;\r
  --color-yellow-200: #fbe5b9;\r
  --color-yellow-300: #f8d795;\r
  --color-yellow-400: #f6ca72;\r
  --color-yellow-500: #c89b40;\r
  --color-yellow-600: #9d7930;\r
  --color-yellow-700: #715621;\r
  --color-yellow-800: #5b4519;\r
  --color-yellow-900: #463411;\r
  --color-yellow-950: #30230a;\r
\r
  /* \u2500\u2500 Cherry \u2500\u2500 */\r
  --color-cherry-50:  #f8f0f1;\r
  --color-cherry-100: #f1e0e4;\r
  --color-cherry-200: #e2c1c8;\r
  --color-cherry-300: #d4a3ad;\r
  --color-cherry-400: #c58491;\r
  --color-cherry-500: #bb6779;\r
  --color-cherry-600: #6e3d47;\r
  --color-cherry-700: #49282f;\r
  --color-cherry-800: #371e23;\r
  --color-cherry-900: #251418;\r
  --color-cherry-950: #120a0c;\r
\r
  /* \u2500\u2500 Indigo \u2500\u2500 */\r
  --color-indigo-50:  #f2f4fc;\r
  --color-indigo-100: #e5e9f9;\r
  --color-indigo-200: #cbd4f2;\r
  --color-indigo-300: #b2beec;\r
  --color-indigo-400: #98a9e5;\r
  --color-indigo-500: #6779bb;\r
  --color-indigo-600: #505f97;\r
  --color-indigo-700: #394673;\r
  --color-indigo-800: #2e3961;\r
  --color-indigo-900: #222c4f;\r
  --color-indigo-950: #171f3d;\r
\r
  /* \u2500\u2500 Cyan \u2500\u2500 */\r
  --color-cyan-50:  #e6eff0;\r
  --color-cyan-100: #d4e3e4;\r
  --color-cyan-200: #b1cccd;\r
  --color-cyan-300: #8db4b5;\r
  --color-cyan-400: #6a9d9e;\r
  --color-cyan-500: #468586;\r
  --color-cyan-600: #2a5050;\r
  --color-cyan-700: #1c3536;\r
  --color-cyan-800: #152828;\r
  --color-cyan-900: #0e1b1b;\r
  --color-cyan-950: #070d0d;\r
}\r

/* Vendored from lexiq-prototype scss/bg-colors.scss \u2014 :root rewritten to :host */\r
:host {\r
\r
  /* \u2500\u2500 Primary \u2500\u2500 */\r
  --bg-primary-base:     var(--color-sage-800);\r
  --bg-primary-hovered:  var(--color-sage-950);\r
  --bg-primary-pressed:  var(--color-sage-300);\r
  --bg-primary-light:    var(--color-sage-200);\r
  --bg-primary-lighter:  var(--color-sage-100);\r
  --bg-primary-lightest: var(--color-sage-50);\r
\r
  /* \u2500\u2500 Secondary \u2500\u2500 */\r
  --bg-secondary-base:     var(--color-almond-500);\r
  --bg-secondary-base-alt: var(--color-almond-800);\r
  --bg-secondary-active:   var(--color-almond-300);\r
  --bg-secondary-light:    var(--color-almond-200);\r
  --bg-secondary-lighter:  var(--color-almond-100);\r
  --bg-secondary-lightest: var(--color-almond-50);\r
\r
  /* \u2500\u2500 Accent \u2500\u2500 */\r
  --bg-accent-base:     var(--color-pink-800);\r
  --bg-accent-base-alt: var(--color-pink-200);\r
  --bg-accent-hover:    var(--color-pink-100);\r
  --bg-accent-pressed:  var(--color-pink-900);\r
\r
  /* \u2500\u2500 Neutral \u2500\u2500 */\r
  --bg-neutral-base:     #e2e5e9;\r
  --bg-neutral-disabled: #bec7cf;\r
  --bg-neutral-white:    #ffffff;\r
  --bg-neutral-base-alt: #343d46;\r
\r
  /* \u2500\u2500 Warning \u2500\u2500 */\r
  --bg-warning-base:     var(--color-orange-700);\r
  --bg-warning-base-alt: var(--color-orange-200);\r
  --bg-warning-lightest: var(--color-orange-50);\r
\r
  /* \u2500\u2500 Success \u2500\u2500 */\r
  --bg-success-base:     var(--color-green-600);\r
  --bg-success-base-alt: var(--color-green-200);\r
  --bg-success-lightest: var(--color-green-50);\r
\r
  /* \u2500\u2500 Info \u2500\u2500 */\r
  --bg-info-base:     var(--color-blue-600);\r
  --bg-info-base-alt: var(--color-blue-200);\r
  --bg-info-lightest: var(--color-blue-50);\r
\r
  /* \u2500\u2500 Error \u2500\u2500 */\r
  --bg-error-base:     var(--color-red-600);\r
  --bg-error-base-alt: var(--color-red-200);\r
  --bg-error-lightest: var(--color-red-50);\r
\r
  /* \u2500\u2500 Cherry \u2500\u2500 */\r
  --bg-cherry-base:     var(--color-cherry-600);\r
  --bg-cherry-base-alt: var(--color-cherry-200);\r
\r
  /* \u2500\u2500 Indigo \u2500\u2500 */\r
  --bg-indigo-base:     var(--color-indigo-600);\r
  --bg-indigo-base-alt: var(--color-indigo-200);\r
\r
  /* \u2500\u2500 Yellow \u2500\u2500 */\r
  --bg-yellow-base:     var(--color-yellow-700);\r
  --bg-yellow-base-alt: var(--color-yellow-200);\r
\r
  /* \u2500\u2500 Cyan \u2500\u2500 */\r
  --bg-cyan-base:     var(--color-cyan-600);\r
  --bg-cyan-base-alt: var(--color-cyan-200);\r
}\r

/* Vendored from lexiq-prototype scss/font-colors.scss \u2014 :root rewritten to :host */\r
:host {\r
\r
  /* \u2500\u2500 Primary \u2500\u2500 */\r
  --font-primary-dark:    var(--color-sage-950);\r
  --font-primary-base:    var(--color-sage-800);\r
  --font-primary-muted:   var(--color-sage-600);\r
  --font-primary-hovered: var(--color-sage-900);\r
  --font-primary-pressed: var(--color-sage-950);\r
  --font-primary-light:   var(--color-sage-200);\r
\r
  /* \u2500\u2500 Secondary \u2500\u2500 */\r
  --font-secondary-base:     var(--color-almond-800);\r
  --font-secondary-hovered:  var(--color-almond-900);\r
  --font-secondary-pressed:  var(--color-almond-950);\r
  --font-secondary-base-alt: var(--color-almond-600);\r
\r
  /* \u2500\u2500 Accent \u2500\u2500 */\r
  --font-accent-base:    var(--color-pink-950);\r
  --font-accent-pressed: var(--color-pink-50);\r
  --font-accent-light:   var(--color-pink-200);\r
  --font-accent-muted:   var(--color-pink-800);\r
\r
  /* \u2500\u2500 Neutral \u2500\u2500 */\r
  --font-neutral-black: #182021;\r
  --font-neutral-white: #ffffff;\r
  --font-neutral-base:  #343d46;\r
  --font-neutral-muted: #596978;\r
  --font-neutral-light: #bec7cf;\r
\r
  /* \u2500\u2500 Warning \u2500\u2500 */\r
  --font-warning-base:  var(--color-orange-800);\r
  --font-warning-light: var(--color-orange-200);\r
  --font-warning-muted: var(--color-orange-600);\r
\r
  /* \u2500\u2500 Info \u2500\u2500 */\r
  --font-info-base:  var(--color-blue-800);\r
  --font-info-light: var(--color-blue-200);\r
  --font-info-muted: var(--color-blue-600);\r
\r
  /* \u2500\u2500 Error \u2500\u2500 */\r
  --font-error-base:  var(--color-red-800);\r
  --font-error-light: var(--color-red-200);\r
  --font-error-muted: var(--color-red-600);\r
\r
  /* \u2500\u2500 Success \u2500\u2500 */\r
  --font-success-base:  var(--color-green-800);\r
  --font-success-light: var(--color-green-200);\r
  --font-success-muted: var(--color-green-600);\r
\r
  /* \u2500\u2500 Cherry \u2500\u2500 */\r
  --font-cherry-base:  var(--color-cherry-800);\r
  --font-cherry-muted: var(--color-cherry-600);\r
\r
  /* \u2500\u2500 Indigo \u2500\u2500 */\r
  --font-indigo-base:  var(--color-indigo-800);\r
  --font-indigo-muted: var(--color-indigo-600);\r
\r
  /* \u2500\u2500 Yellow \u2500\u2500 */\r
  --font-yellow-base:  var(--color-yellow-800);\r
  --font-yellow-muted: var(--color-yellow-700);\r
\r
  /* \u2500\u2500 Cyan \u2500\u2500 */\r
  --font-cyan-base:  var(--color-cyan-800);\r
  --font-cyan-muted: var(--color-cyan-600);\r
}\r

/* Vendored from lexiq-prototype scss/stroke-colors.scss \u2014 :root rewritten to :host */\r
:host {\r
\r
  /* \u2500\u2500 Primary \u2500\u2500 */\r
  --stroke-primary-base:     var(--color-sage-800);\r
  --stroke-primary-hovered:  var(--color-sage-900);\r
  --stroke-primary-pressed:  var(--color-sage-950);\r
  --stroke-primary-light:    var(--color-sage-300);\r
  --stroke-primary-lighter:  var(--color-sage-200);\r
  --stroke-primary-lightest: var(--color-sage-700);\r
\r
  /* \u2500\u2500 Secondary \u2500\u2500 */\r
  --stroke-secondary-base:  var(--color-almond-700);\r
  --stroke-secondary-muted: var(--color-almond-600);\r
  --stroke-secondary-dark:  var(--color-almond-800);\r
\r
  /* \u2500\u2500 Accent \u2500\u2500 */\r
  --stroke-accent-base:  var(--color-pink-900);\r
  --stroke-accent-muted: var(--color-pink-800);\r
\r
  /* \u2500\u2500 Focus \u2500\u2500 */\r
  --stroke-focus: var(--color-pink-700);\r
\r
  /* \u2500\u2500 Warning \u2500\u2500 */\r
  --stroke-warning-base:  var(--color-orange-700);\r
  --stroke-warning-muted: var(--color-orange-600);\r
\r
  /* \u2500\u2500 Info \u2500\u2500 */\r
  --stroke-info-base:  var(--color-blue-700);\r
  --stroke-info-muted: var(--color-blue-600);\r
\r
  /* \u2500\u2500 Success \u2500\u2500 */\r
  --stroke-success-base:  var(--color-green-700);\r
  --stroke-success-muted: var(--color-green-600);\r
\r
  /* \u2500\u2500 Error \u2500\u2500 */\r
  --stroke-error-base:  var(--color-red-700);\r
  --stroke-error-muted: var(--color-red-600);\r
\r
  /* \u2500\u2500 Cherry \u2500\u2500 */\r
  --stroke-cherry-base:  var(--color-cherry-700);\r
  --stroke-cherry-muted: var(--color-cherry-600);\r
\r
  /* \u2500\u2500 Indigo \u2500\u2500 */\r
  --stroke-indigo-base:  var(--color-indigo-700);\r
  --stroke-indigo-muted: var(--color-indigo-600);\r
\r
  /* \u2500\u2500 Yellow \u2500\u2500 */\r
  --stroke-yellow-base:  var(--color-yellow-800);\r
  --stroke-yellow-muted: var(--color-yellow-700);\r
\r
  /* \u2500\u2500 Cyan \u2500\u2500 */\r
  --stroke-cyan-base:  var(--color-cyan-700);\r
  --stroke-cyan-muted: var(--color-cyan-600);\r
\r
  /* \u2500\u2500 Neutral \u2500\u2500 */\r
  --stroke-neutral-light:    #E5E6E8;\r
  --stroke-neutral-base:     #D9E2E3;\r
  --stroke-neutral-disabled: #a4b0bc;\r
  --stroke-neutral-white:    #f2f2f3;\r
  --stroke-neutral-dark:     #343d46;\r
  --stroke-neutral-black:    #182021;\r
}\r

/* Vendored from lexiq-prototype scss/variables.scss \u2014 :root rewritten to :host. */\r
:host {\r
  /* \u2500\u2500 App shell \u2500\u2500 */\r
  --color-bg-app:     var(--color-sage-950);\r
  --color-bg-main:    var(--color-gray-50);\r
  --color-bg-sidebar: var(--color-sage-950);\r
\r
  /* \u2500\u2500 Text \u2500\u2500 */\r
  --color-text-primary:     var(--font-neutral-black);\r
  --color-text-body:        var(--font-primary-hovered);\r
  --color-text-muted:       var(--color-sage-500);\r
  --color-text-subtle:      var(--font-primary-base);\r
  --color-text-placeholder: var(--font-primary-muted);\r
\r
  /* \u2500\u2500 Borders & surfaces \u2500\u2500 */\r
  --color-border-light:  var(--stroke-primary-lighter);\r
  --color-border-chip:   var(--stroke-primary-light);\r
  --color-surface-hover: var(--color-gray-200);\r
  --color-surface-light: var(--bg-primary-lightest);\r
\r
  /* \u2500\u2500 Accent (send button) \u2500\u2500 */\r
  --color-accent-send:       var(--bg-accent-base-alt);\r
  --color-accent-send-hover: var(--color-pink-300);\r
  --color-accent-send-icon:  var(--font-accent-base);\r
\r
  /* \u2500\u2500 Avatar \u2500\u2500 */\r
  --color-avatar-bg:   var(--color-sage-800);\r
  --color-avatar-text: var(--color-sage-200);\r
\r
  /* \u2500\u2500 Sidebar nav \u2500\u2500 */\r
  --color-nav-hover:  var(--color-sage-900);\r
  --color-nav-active: var(--color-sage-800);\r
\r
  /* \u2500\u2500 Gradient \u2500\u2500 */\r
  --gradient-name: linear-gradient(93deg, #1B97BF 0%, #8A3BFF 100%);\r
\r
  /* \u2500\u2500 Robot illustration colors \u2500\u2500 */\r
  --rc-1: #bad3ca;\r
  --rc-2: var(--color-cyan-800);\r
  --rc-3: var(--color-cyan-600);\r
  --rc-4: var(--color-cyan-500);\r
  --rc-5: #d2e3dd;\r
  --rc-6: #aecac0;\r
  --rc-7: #cee6dd;\r
  --rc-8: #92b8aa;\r
  --rc-9: #effbf7;\r
  --rs:   var(--color-sage-500);\r
}\r

/* Vendored from lexiq-prototype scss/dark-mode.scss.\r
   Activation changed from \`body.lq-dark\` (global class on the host page) to\r
   \`:host([theme="dark"])\` (an attribute on the custom element itself), since a\r
   generic component cannot depend on a class toggled on the host's <body>. */\r
\r
:host([theme="dark"]) {\r
\r
  /* \u2500\u2500 App shell \u2500\u2500 */\r
  --color-bg-app:     var(--color-sage-975);\r
  --color-bg-main:    var(--color-gray-950);\r
  --color-bg-sidebar: var(--color-sage-975);\r
\r
  /* \u2500\u2500 App-level semantic aliases \u2500\u2500 */\r
  --color-text-primary:     var(--color-gray-200);\r
  --color-text-body:        #E2E5E9;\r
  --color-text-muted:       var(--color-sage-300);\r
  --color-text-subtle:      var(--color-sage-200);\r
  --color-text-placeholder: var(--color-sage-500);\r
  --color-border-light:     var(--color-sage-900);\r
  --color-border-chip:      var(--color-sage-700);\r
  --color-surface-hover:    var(--color-sage-950);\r
  --color-surface-light:    var(--color-sage-975);\r
  --color-nav-hover:        var(--color-sage-950);\r
  --color-nav-active:       var(--color-sage-900);\r
\r
  /* \u2500\u2500 Font tokens \u2500\u2500 */\r
  --font-primary-dark:       var(--color-gray-200);\r
  --font-primary-base:       #E2E5E9;\r
  --font-primary-muted:      var(--color-sage-300);\r
  --font-primary-hovered:    var(--color-sage-50);\r
  --font-primary-pressed:    #FFFFFF;\r
  --font-primary-light:      var(--color-sage-700);\r
  --font-secondary-base:     var(--color-sage-200);\r
  --font-secondary-hovered:  var(--color-almond-400);\r
  --font-secondary-pressed:  var(--color-almond-300);\r
  --font-secondary-base-alt: var(--color-almond-200);\r
  --font-accent-base:        var(--color-pink-100);\r
  --font-accent-pressed:     #FFFFFF;\r
  --font-accent-light:       var(--color-pink-700);\r
  --font-accent-muted:       var(--color-pink-200);\r
  --font-neutral-base:       #E2E5E9;\r
  --font-neutral-muted:      var(--color-sage-300);\r
  --font-neutral-light:      var(--color-sage-800);\r
  --font-neutral-white:      var(--color-gray-100);\r
  --font-neutral-black:      var(--color-gray-200);\r
\r
  /* \u2500\u2500 Background tokens \u2500\u2500 */\r
  --bg-primary-base:       var(--color-sage-700);\r
  --bg-primary-hovered:    var(--color-sage-600);\r
  --bg-primary-pressed:    var(--color-sage-800);\r
  --bg-primary-active:     var(--color-sage-600);\r
  --bg-primary-light:      var(--color-sage-900);\r
  --bg-primary-lighter:    var(--color-sage-950);\r
  --bg-primary-lightest:   var(--color-sage-975);\r
  --bg-secondary-base:     var(--color-almond-600);\r
  --bg-secondary-base-alt: var(--color-almond-700);\r
  --bg-secondary-active:   var(--color-almond-800);\r
  --bg-secondary-light:    var(--color-almond-800);\r
  --bg-secondary-lighter:  var(--color-almond-900);\r
  --bg-secondary-lightest: var(--color-almond-950);\r
  --bg-accent-base:        var(--color-pink-950);\r
  --bg-accent-base-alt:    var(--color-pink-900);\r
  --bg-accent-hover:       var(--color-pink-900);\r
  --bg-accent-pressed:     var(--color-pink-950);\r
  --bg-neutral-base:       var(--color-sage-900);\r
  --bg-neutral-disabled:   var(--color-sage-950);\r
  --bg-neutral-white:      var(--color-gray-950);\r
\r
  /* \u2500\u2500 Stroke tokens \u2500\u2500 */\r
  --stroke-focus:             var(--color-pink-300);\r
  --stroke-primary-base:      var(--color-cyan-400);\r
  --stroke-primary-hovered:   var(--color-sage-300);\r
  --stroke-primary-pressed:   var(--color-almond-200);\r
  --stroke-primary-light:     var(--color-sage-700);\r
  --stroke-primary-lighter:   var(--color-sage-900);\r
  --stroke-primary-muted:     var(--color-sage-500);\r
  --stroke-secondary-base:    var(--color-almond-400);\r
  --stroke-secondary-muted:   var(--color-almond-500);\r
  --stroke-secondary-dark:    var(--color-almond-600);\r
  --stroke-accent-base:       var(--color-pink-300);\r
  --stroke-accent-muted:      var(--color-pink-500);\r
  --stroke-neutral-light:     var(--color-sage-900);\r
  --stroke-neutral-base:      var(--color-sage-800);\r
  --stroke-neutral-dark:      var(--color-gray-300);\r
  --stroke-neutral-disabled:  var(--color-gray-700);\r
  --stroke-neutral-white:     var(--color-sage-900);\r
\r
  /* \u2500\u2500 Shadows \u2500\u2500 */\r
  --shadow-1: 0px 4px 6px rgba(0, 0, 0, 0.35), 0px 2px 4px rgba(0, 0, 0, 0.25);\r
  --shadow-2: 0px 10px 15px rgba(0, 0, 0, 0.4), 0px 4px 6px rgba(0, 0, 0, 0.3);\r
  --shadow-3: 0px 20px 25px rgba(0, 0, 0, 0.45), 0px 10px 10px rgba(0, 0, 0, 0.35);\r
  --shadow-4: 0px 25px 50px rgba(0, 0, 0, 0.55);\r
  --shadow-inner: inset -1px -1px 6px rgba(0, 0, 0, 0.4), inset 1px 1px 6px rgba(255, 255, 255, 0.08);\r
\r
  /* \u2500\u2500 Effects \u2500\u2500 */\r
  --effect-frosted-cloud-bg:     rgba(244, 249, 249, 0.08);\r
  --effect-frosted-cloud-stroke: rgba(244, 249, 249, 0.18);\r
  --effect-frosted-glass-bg:     rgba(244, 249, 249, 0.06);\r
  --effect-frosted-glass-stroke: rgba(244, 249, 249, 0.12);\r
  --effect-midnight-glass-bg:    rgba(34, 45, 48, 0.52);\r
  --effect-midnight-glass-stroke:rgba(168, 190, 194, 0.18);\r
  --effect-default-blur-bg:      rgba(20, 31, 35, 0.3);\r
  --effect-default-blur-stroke:  rgba(244, 249, 249, 0.16);\r
\r
  /* \u2500\u2500 Scrims \u2500\u2500 */\r
  --scrim-base:     rgba(0, 0, 0, 0.62);\r
  --scrim-strong:   rgba(0, 0, 0, 0.72);\r
  --scrim-stronger: rgba(0, 0, 0, 0.82);\r
\r
  /* \u2500\u2500 Robot illustration colors \u2500\u2500 */\r
  --rc-1: #819d92;\r
  --rc-2: var(--color-cyan-950);\r
  --rc-3: var(--color-cyan-800);\r
  --rc-4: var(--color-cyan-600);\r
  --rc-5: var(--color-sage-300);\r
  --rc-6: #8eada1;\r
  --rc-7: #92ada3;\r
  --rc-8: #6d8d81;\r
  --rc-9: var(--color-sage-300);\r
  --rs:   var(--color-sage-800);\r
}\r
\r
/* Note: the original also had a \`body.lq-dark .lq-sidebar { ... }\` override \u2014\r
   dropped, Collections has no sidebar of its own. */\r

/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\r
   LexiQ Link Component\r
   Ported from galactik-design-react Link\r
\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\r
\r
.oc-link {\r
  display: inline-flex;\r
  align-items: center;\r
  gap: var(--space-3xs);\r
  padding: 0 var(--space-3xs);\r
  border: none;\r
  border-radius: var(--radius-xs);\r
  background: transparent;\r
  color: var(--font-secondary-base-alt);\r
  font-family: "Hanken Grotesk", sans-serif;\r
  font-weight: 400;\r
  text-decoration: none;\r
  cursor: pointer;\r
  user-select: none;\r
  transition: background 100ms ease, color 100ms ease, font-weight 100ms ease;\r
  border-bottom: 2px solid transparent;\r
\r
  &:hover:not(.oc-link-disabled) {\r
    background: var(--bg-secondary-lighter);\r
    color: var(--font-secondary-hovered);\r
    font-weight: 600;\r
  }\r
\r
  &:active:not(.oc-link-disabled) {\r
    background: var(--bg-secondary-light);\r
    color: var(--font-secondary-pressed);\r
    font-weight: 600;\r
  }\r
\r
  &:focus-visible {\r
    outline: 2px solid var(--stroke-focus);\r
    outline-offset: 1px;\r
  }\r
}\r
\r
.oc-link-size-medium {\r
  font-size: var(--text-p-base-regular-size);\r
  line-height: 20px;\r
}\r
\r
.oc-link-size-small {\r
  font-size: var(--text-p-sm-regular-size);\r
  line-height: 16px;\r
}\r
\r
.oc-link-icon-left,\r
.oc-link-icon-right {\r
  flex-shrink: 0;\r
  display: flex;\r
  align-items: center;\r
\r
  svg { width: 1em; height: 1em; }\r
}\r
\r
.oc-link-size-medium .oc-link-icon-left,\r
.oc-link-size-medium .oc-link-icon-right { font-size: 14px; }\r
\r
.oc-link-size-small .oc-link-icon-left,\r
.oc-link-size-small .oc-link-icon-right  { font-size: 12px; }\r
\r
.oc-link-label { line-height: inherit; }\r
\r
/* \u2500\u2500 Visited \u2500\u2500 */\r
.oc-link-visited {\r
  border-bottom-color: var(--stroke-secondary-base);\r
\r
  &:hover:not(.oc-link-disabled)  { border-bottom-color: var(--font-secondary-hovered); }\r
  &:active:not(.oc-link-disabled) { border-bottom-color: var(--font-secondary-pressed); }\r
}\r
\r
/* \u2500\u2500 Disabled \u2500\u2500 */\r
.oc-link-disabled {\r
  background: var(--bg-neutral-disabled);\r
  color: var(--font-neutral-muted);\r
  cursor: not-allowed;\r
  pointer-events: none;\r
}\r

/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\r
   LexiQ List Component\r
   Ported from galactik-design-react List\r
\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\r
\r
/* \u2500\u2500 Base item \u2500\u2500 */\r
.oc-list-item {\r
  display: flex;\r
  align-items: center;\r
  gap: var(--space-2xs);\r
  padding: var(--space-3xs) var(--space-2xs);\r
  border-radius: var(--radius-sm);\r
  transition: background-color 0.1s ease;\r
  width: 100%;\r
  box-sizing: border-box;\r
\r
  &[hidden] { display: none !important; }\r
}\r
\r
/* \u2500\u2500 Sizes \u2500\u2500 */\r
.oc-list-item-sm      { height: var(--row-height-sm); }\r
.oc-list-item-md      { height: var(--row-height-md); }\r
.oc-list-item-l       { height: var(--row-height-l);  }\r
.oc-list-item-content { min-height: 28px; }\r
\r
/* \u2500\u2500 Interactive items \u2500\u2500 */\r
.oc-list-item-nav,\r
.oc-list-item-menu {\r
  appearance: none;\r
  background: none;\r
  border: none;\r
  margin: 0;\r
  text-align: left;\r
  cursor: pointer;\r
  font-family: "Hanken Grotesk", sans-serif;\r
}\r
\r
/* \u2500\u2500 States \u2500\u2500 */\r
.oc-list-item:not(.oc-list-item-disabled):hover  { background-color: var(--bg-primary-lighter); }\r
.oc-list-item:not(.oc-list-item-disabled):active { background-color: var(--bg-primary-light); }\r
.oc-list-item:focus-visible { outline: 2px solid var(--stroke-focus); outline-offset: 0; }\r
\r
.oc-list-item-selected,\r
.oc-list-item-hovered { background-color: var(--bg-primary-lighter); }\r
.oc-list-item-pressed  { background-color: var(--bg-primary-light); }\r
.oc-list-item-disabled { background-color: var(--bg-neutral-disabled); pointer-events: none; cursor: default; }\r
\r
/* \u2500\u2500 Left wrapper \u2500\u2500 */\r
.oc-list-item-left {\r
  display: flex;\r
  flex: 1;\r
  min-width: 0;\r
  gap: var(--space-2xs);\r
  align-items: center;\r
}\r
\r
/* \u2500\u2500 Text block \u2500\u2500 */\r
.oc-list-item-text-block {\r
  flex: 1;\r
  min-width: 0;\r
  display: flex;\r
  flex-direction: column;\r
  align-items: flex-start;\r
}\r
\r
.oc-list-item-text {\r
  font-family: "Hanken Grotesk", sans-serif;\r
  font-size: var(--text-p-base-regular-size);\r
  line-height: var(--text-p-base-regular-line-height);\r
  font-weight: 400;\r
  color: var(--font-neutral-black);\r
  overflow: hidden;\r
  text-overflow: ellipsis;\r
  white-space: nowrap;\r
  width: 100%;\r
}\r
\r
.oc-list-item-subtext {\r
  font-family: "Hanken Grotesk", sans-serif;\r
  font-size: var(--text-p-sm-regular-size);\r
  line-height: var(--text-p-sm-regular-line-height);\r
  color: var(--font-primary-base);\r
  overflow: hidden;\r
  text-overflow: ellipsis;\r
  white-space: nowrap;\r
  width: 100%;\r
}\r
\r
.oc-list-item-disabled .oc-list-item-text,\r
.oc-list-item-disabled .oc-list-item-subtext { color: var(--font-neutral-muted); }\r
\r
/* \u2500\u2500 Left icon \u2500\u2500 */\r
.oc-list-item-icon {\r
  display: inline-flex;\r
  align-items: center;\r
  justify-content: center;\r
  width: var(--icon-xs);\r
  height: var(--icon-xs);\r
  font-size: var(--icon-xs);\r
  flex-shrink: 0;\r
  color: var(--font-secondary-base-alt);\r
\r
  svg { width: 1em; height: 1em; }\r
}\r
\r
.oc-list-item-disabled .oc-list-item-icon { color: var(--font-neutral-muted); }\r
\r
/* \u2500\u2500 Expander (navigation) \u2500\u2500 */\r
.oc-list-item-expander {\r
  display: inline-flex;\r
  align-items: center;\r
  justify-content: center;\r
  width: var(--icon-xs);\r
  height: var(--icon-xs);\r
  font-size: var(--icon-2xs);\r
  flex-shrink: 0;\r
  color: var(--font-secondary-base-alt);\r
\r
  svg { width: 1em; height: 1em; }\r
}\r
\r
.oc-list-item-expander-btn {\r
  background: transparent;\r
  border: none;\r
  padding: 0;\r
  margin: 0;\r
  cursor: pointer;\r
  border-radius: var(--radius-xs);\r
  transition: color 0.1s ease, background-color 0.1s ease;\r
\r
  &:hover:not(:disabled) { color: var(--font-neutral-black); background-color: var(--bg-primary-light); }\r
  &:disabled { cursor: default; }\r
}\r
\r
.oc-list-item-disabled .oc-list-item-expander { color: var(--font-neutral-muted); }\r
\r
/* \u2500\u2500 Avatar \u2500\u2500 */\r
.oc-list-item-avatar {\r
  display: inline-flex;\r
  align-items: center;\r
  justify-content: center;\r
  width: var(--row-height-sm);\r
  height: var(--row-height-sm);\r
  border-radius: var(--radius-rounded);\r
  background-color: var(--bg-primary-lightest);\r
  flex-shrink: 0;\r
  overflow: hidden;\r
}\r
\r
/* \u2500\u2500 Right remove icon \u2500\u2500 */\r
.oc-list-item-icon-right {\r
  display: inline-flex;\r
  align-items: center;\r
  justify-content: center;\r
  font-size: var(--icon-2xs);\r
  flex-shrink: 0;\r
  color: var(--font-primary-muted);\r
  background: transparent;\r
  border: none;\r
  padding: 2px;\r
  cursor: pointer;\r
  line-height: 1;\r
  border-radius: var(--radius-xs);\r
  transition: color 0.1s ease, background-color 0.1s ease;\r
  opacity: 0;\r
\r
  svg { width: 1em; height: 1em; }\r
}\r
\r
.oc-list-item:hover .oc-list-item-icon-right,\r
.oc-list-item-hovered .oc-list-item-icon-right,\r
.oc-list-item-selected .oc-list-item-icon-right { opacity: 1; }\r
\r
.oc-list-item-icon-right:hover {\r
  color: var(--font-error-base);\r
  background-color: var(--bg-error-lightest);\r
}\r
\r
/* \u2500\u2500 Right chevron (list-menu) \u2500\u2500 */\r
.oc-list-item-chevron-right {\r
  display: inline-flex;\r
  align-items: center;\r
  justify-content: center;\r
  font-size: var(--icon-xs);\r
  flex-shrink: 0;\r
  color: var(--font-secondary-base-alt);\r
  transition: transform 0.15s ease;\r
\r
  svg { width: 1em; height: 1em; }\r
}\r
\r
.oc-list-item:hover .oc-list-item-chevron-right { transform: translateX(2px); }\r
\r
/* \u2500\u2500 Reduced motion \u2500\u2500 */\r
@media (prefers-reduced-motion: reduce) {\r
  .oc-list-item,\r
  .oc-list-item-expander-btn,\r
  .oc-list-item-icon-right,\r
  .oc-list-item-chevron-right { transition: none; }\r
}\r

/* \u2500\u2500 SearchBar \u2014 ported from galactik-design-react SearchBar.css \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */\r
/* \u2500\u2500 Variable aliases: bridge Galactik token names \u2192 LexiQ spacing/type \u2500\u2500 */\r
/* :root rewritten to :host (Shadow DOM has no implicit access to :root vars) */\r
:host {\r
  --spacing-3xs: var(--space-3xs);         /* 4px  */\r
  --spacing-2xs: var(--space-3xs);         /* 4px  */\r
  --spacing-xs:  var(--space-2xs);         /* 8px  */\r
  --spacing-sm:  var(--space-xs);          /* 12px */\r
  --spacing-md:  var(--space-md);          /* 16px */\r
  --icon-xs:     14px;\r
  --size-base:   var(--text-p-base-regular-size);\r
  --size-sm:     var(--text-p-sm-regular-size);\r
  --size-xs:     var(--text-p-xs-regular-size);\r
  --family-base: 'Hanken Grotesk', sans-serif;\r
  --spacing-lg:  var(--space-lg);          /* 20px */\r
  --spacing-xl:  var(--space-xl);          /* 24px */\r
  --shadow-1:    0 1px 3px rgba(45, 57, 58, 0.10);\r
  --shadow-2:    0px 10px 15px rgba(45, 57, 58, 0.10), 0px 4px 6px rgba(45, 57, 58, 0.05);\r
  --shadow-4:    0 4px 6px -2px rgba(45, 57, 58, 0.05), 0 10px 15px -3px rgba(45, 57, 58, 0.10);\r
}\r
\r
/* \u2500\u2500 SearchBar / galactik-json search-bar.cva.ts \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */\r
\r
.oc-sb {\r
  display: inline-flex;\r
  align-items: center;\r
  box-sizing: border-box;\r
  width: 100%;\r
  border: 1px solid var(--stroke-primary-light);\r
  border-radius: var(--radius-rounded);\r
  background: var(--bg-neutral-white);\r
  cursor: text;\r
  transition: border-color 0.12s ease, background 0.12s ease;\r
}\r
\r
.oc-sb-size-lg,\r
.oc-sb--large {\r
  height: 44px;\r
  gap: var(--spacing-xs);\r
  padding: 0 var(--spacing-md);\r
}\r
\r
.oc-sb-size-md,\r
.oc-sb--medium {\r
  height: 36px;\r
  gap: var(--spacing-xs);\r
  padding: 0 var(--spacing-sm);\r
}\r
\r
.oc-sb-size-sm,\r
.oc-sb--small {\r
  height: 24px;\r
  gap: var(--spacing-3xs);\r
  padding: 0 var(--spacing-xs);\r
}\r
\r
.oc-sb--chips {\r
  height: auto;\r
  min-height: 44px;\r
  flex-wrap: nowrap;\r
}\r
\r
.oc-sb--chips.oc-sb-size-md,\r
.oc-sb--chips.oc-sb--medium {\r
  min-height: 36px;\r
}\r
\r
.oc-sb--chips.oc-sb-size-sm,\r
.oc-sb--chips.oc-sb--small {\r
  min-height: 24px;\r
}\r
\r
/* \u2500\u2500 States \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */\r
\r
.oc-sb--default {\r
  background: var(--bg-neutral-white);\r
}\r
\r
.oc-sb--active {\r
  border: 2px solid var(--stroke-primary-pressed);\r
}\r
\r
.oc-sb--hovered,\r
.oc-sb:hover:not(.oc-sb--active):not(.oc-sb--disabled) {\r
  background: var(--bg-primary-lighter);\r
  border-color: var(--stroke-primary-hovered);\r
}\r
\r
.oc-sb--focus {\r
  outline: 2px solid var(--stroke-focus);\r
  outline-offset: 2px;\r
}\r
\r
.oc-sb--disabled {\r
  border-color: var(--stroke-neutral-disabled);\r
  background: var(--bg-neutral-disabled);\r
  cursor: not-allowed;\r
  pointer-events: none;\r
}\r
\r
.oc-sb--disabled .oc-sb-input,\r
.oc-sb--disabled .oc-sb-icon { color: var(--font-neutral-muted); }\r
\r
.oc-sb--filled {\r
  color: var(--font-primary-base);\r
}\r
\r
/* \u2500\u2500 CVA sub-elements \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */\r
\r
.oc-sb-icon {\r
  display: inline-flex;\r
  align-items: center;\r
  justify-content: center;\r
  flex-shrink: 0;\r
  color: var(--font-primary-muted);\r
  line-height: 1;\r
}\r
\r
.oc-sb-size-lg .oc-sb-icon,\r
.oc-sb-size-md .oc-sb-icon,\r
.oc-sb--large .oc-sb-icon,\r
.oc-sb--medium .oc-sb-icon {\r
  font-size: var(--icon-xs);\r
}\r
\r
.oc-sb-size-sm .oc-sb-icon,\r
.oc-sb--small .oc-sb-icon {\r
  font-size: 11px;\r
}\r
\r
.oc-sb-input {\r
  flex: 1;\r
  min-width: 0;\r
  padding: 0;\r
  border: none !important;\r
  outline: none;\r
  background: transparent !important;\r
  color: var(--font-neutral-black);\r
  font-family: var(--family-base), 'Hanken Grotesk', sans-serif;\r
  font-weight: 400;\r
  line-height: 1.4;\r
}\r
\r
.oc-sb-size-lg .oc-sb-input,\r
.oc-sb--large .oc-sb-input {\r
  font-size: var(--size-base);\r
}\r
\r
.oc-sb-size-md .oc-sb-input,\r
.oc-sb--medium .oc-sb-input {\r
  font-size: var(--size-sm);\r
}\r
\r
.oc-sb-size-sm .oc-sb-input,\r
.oc-sb--small .oc-sb-input {\r
  font-size: var(--size-xs);\r
}\r
\r
.oc-sb-input::placeholder {\r
  color: var(--font-primary-muted);\r
}\r
\r
.oc-sb-input:disabled {\r
  cursor: not-allowed;\r
}\r
\r
/* \u2500\u2500 Focus state via focus-within \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */\r
\r
.oc-sb:focus-within:not(.oc-sb--disabled) {\r
  border-color: var(--stroke-primary-base);\r
}\r
\r
/* \u2500\u2500 Existing React slots kept compatible \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */\r
\r
.oc-sb__chips {\r
  display: flex;\r
  flex: 1 1 0;\r
  align-items: center;\r
  gap: 4px;\r
  min-width: 0;\r
  overflow-x: auto;\r
  scrollbar-width: none;\r
}\r
\r
.oc-sb-size-sm .oc-sb__chips,\r
.oc-sb--small .oc-sb__chips {\r
  gap: 2px;\r
}\r
\r
.oc-sb__chips::-webkit-scrollbar {\r
  display: none;\r
}\r
\r
.oc-sb__chip {\r
  flex: 0 0 auto;\r
}\r
\r
.oc-sb__actions {\r
  display: inline-flex;\r
  align-items: center;\r
  justify-content: center;\r
  flex-shrink: 0;\r
  min-width: 16px;\r
  margin-left: auto;\r
}\r
\r
.oc-sb-clear {\r
  display: inline-flex;\r
  align-items: center;\r
  justify-content: center;\r
  width: 24px;\r
  height: 24px;\r
  margin: 0;\r
  padding: 0;\r
  border: 0;\r
  border-radius: var(--radius-rounded);\r
  background: transparent;\r
  color: var(--font-primary-muted);\r
  cursor: pointer;\r
}\r
\r
.oc-sb-size-sm .oc-sb-clear,\r
.oc-sb--small .oc-sb-clear {\r
  width: 18px;\r
  height: 18px;\r
  font-size: 11px;\r
}\r
\r
.oc-sb-clear:hover {\r
  background: var(--bg-secondary-lighter);\r
  color: var(--font-primary-hovered);\r
}\r
\r
.oc-sb-clear:focus-visible {\r
  outline: 2px solid var(--stroke-focus);\r
  outline-offset: 2px;\r
}\r
\r
.oc-sb__filter-btn {\r
  color: var(--stroke-primary-base);\r
}\r
\r
/* \u2500\u2500 Base UI Autocomplete popup \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */\r
\r
.oc-sb-positioner {\r
  z-index: 1000;\r
  min-width: var(--anchor-width);\r
}\r
\r
.oc-sb-popup {\r
  box-sizing: border-box;\r
  min-width: var(--anchor-width);\r
  max-height: 280px;\r
  padding: var(--spacing-2xs);\r
  overflow: auto;\r
  border: 1px solid var(--stroke-primary-light);\r
  border-radius: var(--radius-sm);\r
  background: var(--bg-neutral-white);\r
  box-shadow: var(--shadow-4);\r
}\r
\r
.oc-sb-status,\r
.oc-sb-empty,\r
.oc-sb-item {\r
  font-family: var(--family-base), 'Hanken Grotesk', sans-serif;\r
  font-size: var(--size-sm);\r
  line-height: 1.4;\r
}\r
\r
.oc-sb-status,\r
.oc-sb-empty {\r
  padding: var(--spacing-xs) var(--spacing-sm);\r
  color: var(--font-primary-muted);\r
}\r
\r
.oc-sb-list {\r
  display: grid;\r
  gap: 2px;\r
}\r
\r
.oc-sb-item {\r
  padding: var(--spacing-xs) var(--spacing-sm);\r
  border-radius: var(--radius-xs);\r
  color: var(--font-primary-base);\r
  cursor: pointer;\r
}\r
\r
.oc-sb-item[data-highlighted],\r
.oc-sb-item:hover {\r
  background: var(--bg-secondary-lighter);\r
}\r
\r
.oc-sb-item[data-disabled] {\r
  color: var(--font-neutral-muted);\r
  cursor: not-allowed;\r
}\r
\r
@media (prefers-reduced-motion: reduce) {\r
  .oc-sb {\r
    transition: none;\r
  }\r
}\r

/* \u2500\u2500 Scrollbar component \u2014 matches galactik-design Scrollbar electron \u2500\u2500 */\r
\r
/* All scrollable surfaces in the prototype */\r
.lq-scroll-area,\r
.lq-chat-history,\r
.lq-dp-content,\r
.lq-dp-email-body-wrap,\r
.lq-dp-fp__list,\r
.lq-dp-fp__opts-list,\r
.lq-dp-search-card__results,\r
.lq-search-overlay__list,\r
.lq-ext-email-list,\r
.lq-ext-cal-list,\r
.lq-ext-widget--calendar,\r
.lq-pmenu-left,\r
.lq-textarea,\r
.lq-ref-card-content,\r
.lq-report-body,\r
.lq-suggestions,\r
.lq-agents-list,\r
.lq-ad-body,\r
.oc-scrollable {\r
  /* \u2500\u2500 Firefox \u2500\u2500 */\r
  scrollbar-width: thin;\r
  scrollbar-color: var(--bg-primary-base) transparent;\r
\r
  /* \u2500\u2500 WebKit / Blink \u2014 22 px total width, matches design-system track width \u2500\u2500 */\r
  &::-webkit-scrollbar        { width: 22px; height: 22px; }\r
  &::-webkit-scrollbar-corner { background: transparent; }\r
  &::-webkit-scrollbar-track  { background: transparent; }\r
\r
  /* Thumb: 4 px visual via border trick */\r
  &::-webkit-scrollbar-thumb {\r
    background-color: var(--bg-primary-base);\r
    border-radius:    var(--radius-rounded);\r
    border:           9px solid transparent;\r
    background-clip:  padding-box;\r
    min-height:       20px;\r
    min-width:        20px;\r
  }\r
\r
  /* Hover: expands to 8 px, darker */\r
  &::-webkit-scrollbar-thumb:hover {\r
    background-color: var(--bg-primary-hovered);\r
    border-width:     7px;\r
  }\r
\r
  /* Pressed: black */\r
  &::-webkit-scrollbar-thumb:active {\r
    background-color: var(--font-primary-base);\r
    border-width:     7px;\r
  }\r
\r
  /* Track background appears on container hover */\r
  &:hover::-webkit-scrollbar-track {\r
    background:   var(--bg-primary-lightest);\r
    border-left:  1px solid var(--stroke-primary-lighter);\r
    border-right: 1px solid var(--stroke-primary-lighter);\r
  }\r
\r
  /* Horizontal variant */\r
  &:hover::-webkit-scrollbar-track:horizontal {\r
    border-left:   none;\r
    border-right:  none;\r
    border-top:    1px solid var(--stroke-primary-lighter);\r
    border-bottom: 1px solid var(--stroke-primary-lighter);\r
  }\r
}\r

/* \u2500\u2500 TabGroup \u2014 ported from Galactik design system \u2500\u2500 */\r
\r
/* \u2500\u2500 Group container \u2500\u2500 */\r
\r
.oc-tab-group {\r
  display: inline-flex;\r
  flex-direction: column;\r
  max-width: 100%;\r
}\r
\r
.oc-tab-group__items {\r
  display: inline-flex;\r
  align-items: center;\r
  flex-wrap: nowrap;\r
  gap: var(--space-3xs);\r
  width: fit-content;\r
}\r
\r
/* Primary: pill strip */\r
.oc-tab-group--primary {\r
  width: fit-content;\r
}\r
\r
.oc-tab-group--primary .oc-tab-group__items {\r
  background: var(--bg-primary-lightest);\r
  border-radius: var(--radius-rounded);\r
  padding: var(--space-3xs);\r
}\r
\r
/* Secondary: flat row with bottom border */\r
.oc-tab-group--secondary {\r
  background: var(--bg-neutral-white, #fff);\r
  border-bottom: 1px solid var(--stroke-primary-lighter);\r
}\r
\r
/* Inner: same underline style, transparent background */\r
.oc-tab-group--inner {\r
  background: transparent;\r
  border-bottom: 1px solid var(--stroke-primary-lighter);\r
}\r
\r
/* Panel */\r
.oc-tab-group__panel {\r
  margin-top: var(--space-md);\r
  color: var(--font-primary-base);\r
  font-family: 'Hanken Grotesk', sans-serif;\r
  font-size: var(--text-p-sm-regular-size);\r
  line-height: 1.5;\r
}\r
\r
.oc-tab-group__panel[hidden] { display: none; }\r
\r
/* \u2500\u2500 Tab button \u2500\u2500 */\r
\r
.oc-tab {\r
  display: inline-flex;\r
  align-items: center;\r
  gap: var(--space-3xs);\r
  border: none;\r
  background: transparent;\r
  cursor: pointer;\r
  font-family: inherit;\r
  color: var(--font-primary-base);\r
  font-weight: 400;\r
  white-space: nowrap;\r
  flex-shrink: 0;\r
  outline: none;\r
  transition: background 120ms ease, color 120ms ease, border-color 120ms ease;\r
  position: relative;\r
  user-select: none;\r
}\r
\r
.oc-tab:focus-visible {\r
  outline: 2px solid var(--stroke-focus);\r
  outline-offset: 2px;\r
  border-radius: var(--radius-rounded);\r
}\r
\r
.oc-tab:disabled,\r
.oc-tab[aria-disabled="true"] {\r
  cursor: not-allowed;\r
  pointer-events: none;\r
}\r
\r
/* \u2500\u2500 Sizes \u2500\u2500 */\r
\r
.oc-tab--sm {\r
  font-size: var(--text-p-sm-regular-size);\r
  padding: 0 var(--space-2xs);\r
  border-radius: var(--radius-sm);\r
  height: 24px;\r
}\r
\r
.oc-tab--md {\r
  font-size: var(--text-p-base-regular-size);\r
  padding: 0 var(--space-xs);\r
  border-radius: var(--radius-sm);\r
  height: 36px;\r
}\r
\r
/* \u2500\u2500 Primary variant \u2500\u2500 */\r
\r
.oc-tab-variant-primary {\r
  border-radius: var(--radius-sm);\r
  color: var(--font-primary-base);\r
}\r
\r
.oc-tab-variant-primary:hover:not(:disabled) {\r
  background: var(--bg-primary-hovered);\r
  color: var(--font-neutral-white, #fff);\r
}\r
\r
.oc-tab-variant-primary[aria-selected="true"],\r
.oc-tab-variant-primary.oc-tab-active {\r
  background: var(--bg-primary-base);\r
  color: var(--font-neutral-white, #fff);\r
  font-weight: 600;\r
}\r
\r
.oc-tab-variant-primary:active:not(:disabled) {\r
  background: var(--bg-primary-pressed);\r
  color: var(--font-neutral-black);\r
  font-weight: 700;\r
}\r
\r
.oc-tab-variant-primary:disabled,\r
.oc-tab-variant-primary.oc-tab-disabled {\r
  background: var(--bg-neutral-disabled);\r
  color: var(--font-neutral-muted);\r
  cursor: not-allowed;\r
  pointer-events: none;\r
}\r
\r
/* \u2500\u2500 Secondary variant \u2500\u2500 */\r
\r
.oc-tab-variant-secondary,\r
.oc-tab-variant-inner {\r
  border-radius: var(--radius-sm) var(--radius-sm) 0 0;\r
  height: auto;\r
  border-bottom: 2px solid transparent;\r
  margin-bottom: -1px;\r
  color: var(--font-primary-base);\r
  font-weight: 600;\r
}\r
\r
.oc-tab-variant-secondary.oc-tab--sm,\r
.oc-tab-variant-inner.oc-tab--sm {\r
  padding-block: var(--space-2xs);\r
}\r
\r
.oc-tab-variant-secondary.oc-tab--md,\r
.oc-tab-variant-inner.oc-tab--md {\r
  padding-block: var(--space-xs);\r
}\r
\r
.oc-tab-variant-secondary:hover:not(:disabled),\r
.oc-tab-variant-inner:hover:not(:disabled) {\r
  background: var(--bg-primary-lighter);\r
  color: var(--font-primary-hovered);\r
}\r
\r
.oc-tab-variant-secondary:active:not(:disabled),\r
.oc-tab-variant-inner:active:not(:disabled) {\r
  background: var(--bg-primary-light);\r
  color: var(--font-primary-dark);\r
  font-weight: 700;\r
}\r
\r
.oc-tab-variant-secondary[aria-selected="true"],\r
.oc-tab-variant-secondary.oc-tab-active {\r
  background: var(--bg-neutral-white, #fff);\r
  border-bottom-color: var(--stroke-primary-base);\r
}\r
\r
.oc-tab-variant-secondary[aria-selected="true"]:hover:not(:disabled),\r
.oc-tab-variant-secondary.oc-tab-active:hover:not(:disabled) {\r
  background: var(--bg-primary-lighter);\r
  border-bottom-color: var(--stroke-primary-hovered);\r
}\r
\r
.oc-tab-variant-inner[aria-selected="true"],\r
.oc-tab-variant-inner.oc-tab-active {\r
  background: transparent;\r
  border-bottom-color: var(--stroke-primary-base);\r
}\r
\r
.oc-tab-variant-inner[aria-selected="true"]:hover:not(:disabled),\r
.oc-tab-variant-inner.oc-tab-active:hover:not(:disabled) {\r
  background: var(--bg-primary-lighter);\r
  border-bottom-color: var(--stroke-primary-hovered);\r
}\r
\r
.oc-tab-variant-secondary:disabled,\r
.oc-tab-variant-secondary.oc-tab-disabled,\r
.oc-tab-variant-inner:disabled,\r
.oc-tab-variant-inner.oc-tab-disabled {\r
  color: var(--font-neutral-muted);\r
  cursor: not-allowed;\r
  pointer-events: none;\r
}\r
\r
/* \u2500\u2500 Sub-elements \u2500\u2500 */\r
\r
.oc-tab__icon {\r
  display: flex;\r
  align-items: center;\r
  flex-shrink: 0;\r
  font-size: 13px;\r
}\r
\r
.oc-tab__badge {\r
  display: inline-flex;\r
  align-items: center;\r
  justify-content: center;\r
  min-width: 16px;\r
  height: 16px;\r
  padding: 0 4px;\r
  border-radius: var(--radius-rounded);\r
  background: var(--stroke-primary-lighter);\r
  color: var(--font-primary-base);\r
  font-size: 10px;\r
  font-weight: 600;\r
  line-height: 1;\r
}\r
\r
.oc-tab-variant-primary[aria-selected="true"] .oc-tab__badge,\r
.oc-tab-variant-primary.oc-tab-active .oc-tab__badge {\r
  background: rgba(255, 255, 255, 0.25);\r
  color: var(--font-neutral-white, #fff);\r
}\r
\r
.oc-tab__close {\r
  display: inline-flex;\r
  align-items: center;\r
  justify-content: center;\r
  width: 14px;\r
  height: 14px;\r
  border: none;\r
  background: transparent;\r
  cursor: pointer;\r
  padding: 0;\r
  color: inherit;\r
  border-radius: var(--radius-rounded);\r
  opacity: 0.6;\r
  transition: opacity 0.15s ease;\r
}\r
\r
.oc-tab__close:hover { opacity: 1; }\r

/* \u2500\u2500 Toggle + ToggleGroup \u2014 ported from galactik-design-react \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\r
   Depends on --spacing-* / --shadow-* aliases defined in search-bar.css\r
   \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */\r
\r
/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\r
   TOGGLE (electron)\r
   Variants:  .oc-toggle--unique  (single-select item)\r
              .oc-toggle--multi   (multi-select item)\r
   Sizes:     .oc-toggle--medium  (h=32px)\r
              .oc-toggle--small   (h=24px)\r
   Modifier:  .oc-toggle--icon-only\r
   State:     aria-pressed="true"  |  :disabled\r
\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\r
\r
.oc-toggle {\r
  display: inline-flex;\r
  align-items: center;\r
  justify-content: center;\r
  gap: var(--spacing-3xs);\r
  border: none;\r
  background: transparent;\r
  cursor: pointer;\r
  font-family: inherit;\r
  border-radius: var(--radius-rounded);\r
  white-space: nowrap;\r
  flex-shrink: 0;\r
  -webkit-user-select: none;\r
  user-select: none;\r
  transition: background 0.12s ease, color 0.12s ease, box-shadow 0.12s ease;\r
}\r
\r
.oc-toggle:focus-visible {\r
  outline: var(--stroke-sm) solid var(--stroke-focus);\r
  outline-offset: 2px;\r
}\r
\r
.oc-toggle:disabled,\r
.oc-toggle[aria-disabled="true"] {\r
  background: var(--bg-neutral-disabled);\r
  color: var(--font-neutral-muted);\r
  cursor: not-allowed;\r
  pointer-events: none;\r
}\r
\r
/* \u2500\u2500 Sizes \u2500\u2500 */\r
\r
.oc-toggle--medium {\r
  height: 32px;\r
  padding: 0 var(--spacing-sm);\r
  font-size: var(--text-p-sm-regular-size);\r
  font-weight: var(--text-p-sm-medium-weight, 500);\r
  line-height: var(--text-p-sm-regular-line-height);\r
}\r
\r
.oc-toggle--medium svg,\r
.oc-toggle--medium i {\r
  width: 14px;\r
  height: 14px;\r
}\r
\r
.oc-toggle--medium.oc-toggle--icon-only {\r
  width: 32px;\r
  padding: 0;\r
}\r
\r
.oc-toggle--small {\r
  height: 24px;\r
  padding: 0 var(--spacing-xs);\r
  font-size: var(--text-p-xs-regular-size);\r
  font-weight: var(--text-p-xs-medium-weight, 500);\r
  line-height: var(--text-p-xs-regular-line-height);\r
}\r
\r
.oc-toggle--small svg,\r
.oc-toggle--small i {\r
  width: 12px;\r
  height: 12px;\r
}\r
\r
.oc-toggle--small.oc-toggle--icon-only {\r
  width: 24px;\r
  padding: 0;\r
}\r
\r
/* \u2500\u2500 Unique variant (single-select pill) \u2500\u2500 */\r
\r
.oc-toggle--unique {\r
  color: var(--font-primary-base);\r
}\r
\r
.oc-toggle--unique:hover:not(:disabled):not([aria-pressed="true"]) {\r
  background: var(--bg-primary-hovered);\r
  color: var(--font-neutral-white);\r
}\r
\r
.oc-toggle--unique:active:not(:disabled):not([aria-pressed="true"]) {\r
  background: var(--bg-primary-pressed);\r
  color: var(--font-primary-pressed);\r
  font-weight: 700;\r
}\r
\r
.oc-toggle--unique[aria-pressed="true"] {\r
  background: var(--bg-neutral-white);\r
  color: var(--font-primary-base);\r
  box-shadow: var(--shadow-2);\r
}\r
\r
/* \u2500\u2500 Multi variant (icon-only toggle) \u2500\u2500 */\r
\r
.oc-toggle--multi {\r
  color: var(--font-neutral-black);\r
}\r
\r
.oc-toggle--multi:hover:not(:disabled):not([aria-pressed="true"]) {\r
  background: var(--bg-secondary-lighter);\r
  color: var(--font-secondary-hovered);\r
}\r
\r
.oc-toggle--multi:active:not(:disabled):not([aria-pressed="true"]) {\r
  background: var(--bg-secondary-light);\r
  color: var(--font-secondary-pressed);\r
  font-weight: 700;\r
}\r
\r
.oc-toggle--multi[aria-pressed="true"] {\r
  background: var(--bg-secondary-active);\r
  color: var(--font-neutral-black);\r
}\r
\r
\r
/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\r
   TOGGLE GROUP\r
   Variants:  .oc-toggle-group--single\r
              .oc-toggle-group--multi\r
\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\r
\r
.oc-toggle-group {\r
  display: inline-flex;\r
}\r
\r
.oc-toggle-group--single {\r
  border-radius: var(--radius-rounded);\r
  background: var(--bg-primary-lightest);\r
  padding: var(--spacing-3xs);\r
}\r
\r
.oc-toggle-group--multi {\r
  border: 1px solid var(--stroke-primary-lighter);\r
  border-radius: var(--radius-4xl);\r
  background: var(--bg-neutral-white);\r
  box-shadow: var(--shadow-1);\r
  padding: 0 var(--spacing-xl);\r
}\r
\r
.oc-toggle-group__items {\r
  display: flex;\r
  align-items: center;\r
  gap: var(--spacing-3xs);\r
}\r
\r
.oc-toggle-group__items--multi {\r
  padding: var(--spacing-2xs) 0;\r
}\r

/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\r
   LexiQ Checkbox Component\r
   Ported from galactik-design-react Checkbox\r
\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\r
\r
.oc-checkbox-root {\r
  display: inline-flex;\r
  align-items: center;\r
  gap: var(--space-xs);\r
  user-select: none;\r
  cursor: pointer;\r
  position: relative;\r
}\r
\r
.oc-checkbox-with-hint { align-items: flex-start; }\r
.oc-checkbox-disabled  { cursor: not-allowed; }\r
\r
/* \u2500\u2500 Hidden native input \u2500\u2500 */\r
.oc-checkbox-input {\r
  position: absolute;\r
  width: 1px;\r
  height: 1px;\r
  padding: 0;\r
  margin: -1px;\r
  overflow: hidden;\r
  clip: rect(0, 0, 0, 0);\r
  white-space: nowrap;\r
  border: 0;\r
}\r
\r
/* \u2500\u2500 Hit-area \u2500\u2500 */\r
.oc-checkbox-hitbox {\r
  width: 18px;\r
  height: 18px;\r
  display: inline-flex;\r
  align-items: center;\r
  justify-content: center;\r
  border-radius: var(--radius-xs);\r
  flex-shrink: 0;\r
}\r
\r
/* \u2500\u2500 Visual control \u2500\u2500 */\r
.oc-checkbox-control {\r
  position: relative;\r
  width: 16px;\r
  height: 16px;\r
  border-radius: var(--radius-xs);\r
  border: 1px solid var(--stroke-primary-base);\r
  background-color: var(--bg-neutral-white);\r
  display: inline-flex;\r
  align-items: center;\r
  justify-content: center;\r
  transition: border-color 0.15s ease, background-color 0.15s ease, box-shadow 0.15s ease;\r
\r
  &::after {\r
    content: '';\r
    position: absolute;\r
    inset: -3px;\r
    border-radius: calc(var(--radius-xs) + 3px);\r
    border: 2px solid transparent;\r
    pointer-events: none;\r
    transition: border-color 0.15s ease;\r
  }\r
}\r
\r
/* \u2500\u2500 Icons \u2500\u2500 */\r
.oc-checkbox-icon {\r
  position: absolute;\r
  color: var(--font-neutral-white);\r
  opacity: 0;\r
  transform: scale(0.85);\r
  transition: opacity 0.12s ease, transform 0.12s ease, color 0.15s ease;\r
  display: flex;\r
  align-items: center;\r
  justify-content: center;\r
\r
  svg { width: 1em; height: 1em; }\r
}\r
\r
.oc-checkbox-icon-check { font-size: 10px; }\r
.oc-checkbox-icon-minus { font-size: 12px; }\r
\r
/* \u2500\u2500 Checked / indeterminate \u2500\u2500 */\r
.oc-checkbox-input:checked + .oc-checkbox-hitbox .oc-checkbox-control,\r
.oc-checkbox-input:indeterminate + .oc-checkbox-hitbox .oc-checkbox-control {\r
  background-color: var(--font-primary-base);\r
  border-color: var(--font-primary-base);\r
}\r
\r
.oc-checkbox-input:checked + .oc-checkbox-hitbox .oc-checkbox-icon-check { opacity: 1; transform: scale(1); }\r
.oc-checkbox-input:indeterminate + .oc-checkbox-hitbox .oc-checkbox-icon-minus { opacity: 1; transform: scale(1); }\r
\r
/* \u2500\u2500 Hover \u2500\u2500 */\r
.oc-checkbox-root:not(.oc-checkbox-disabled):hover {\r
  .oc-checkbox-input:not(:checked):not(:indeterminate) + .oc-checkbox-hitbox .oc-checkbox-control {\r
    background-color: var(--bg-primary-lighter);\r
    border-color: var(--stroke-primary-hovered);\r
  }\r
  .oc-checkbox-input:checked + .oc-checkbox-hitbox .oc-checkbox-control,\r
  .oc-checkbox-input:indeterminate + .oc-checkbox-hitbox .oc-checkbox-control {\r
    background-color: var(--font-primary-hovered);\r
    border-color: var(--font-primary-hovered);\r
  }\r
}\r
\r
/* \u2500\u2500 Active \u2500\u2500 */\r
.oc-checkbox-root:not(.oc-checkbox-disabled):active {\r
  .oc-checkbox-input:not(:checked):not(:indeterminate) + .oc-checkbox-hitbox .oc-checkbox-control {\r
    background-color: var(--bg-primary-light);\r
    border-color: var(--stroke-primary-base);\r
    box-shadow: inset 0 0 0 1px var(--stroke-primary-base);\r
  }\r
  .oc-checkbox-input:checked + .oc-checkbox-hitbox .oc-checkbox-control,\r
  .oc-checkbox-input:indeterminate + .oc-checkbox-hitbox .oc-checkbox-control {\r
    background-color: var(--bg-primary-pressed);\r
    border-color: var(--bg-primary-pressed);\r
  }\r
}\r
\r
/* \u2500\u2500 Focus \u2500\u2500 */\r
.oc-checkbox-input:focus-visible + .oc-checkbox-hitbox .oc-checkbox-control::after {\r
  border-color: var(--stroke-focus);\r
}\r
\r
/* \u2500\u2500 Disabled \u2500\u2500 */\r
.oc-checkbox-input:disabled + .oc-checkbox-hitbox .oc-checkbox-control {\r
  background-color: var(--bg-neutral-disabled);\r
  border-color: var(--stroke-neutral-disabled);\r
  box-shadow: none;\r
}\r
\r
.oc-checkbox-input:disabled + .oc-checkbox-hitbox .oc-checkbox-icon { color: var(--stroke-neutral-disabled); }\r
.oc-checkbox-input:disabled:not(:checked):not(:indeterminate) + .oc-checkbox-hitbox .oc-checkbox-icon { opacity: 0; }\r
.oc-checkbox-input:disabled:checked + .oc-checkbox-hitbox .oc-checkbox-icon-check,\r
.oc-checkbox-input:disabled:indeterminate + .oc-checkbox-hitbox .oc-checkbox-icon-minus { opacity: 1; transform: scale(1); }\r
\r
/* \u2500\u2500 Text block \u2500\u2500 */\r
.oc-checkbox-text-block {\r
  display: inline-flex;\r
  flex-direction: column;\r
  gap: 1px;\r
  min-width: 0;\r
}\r
\r
.oc-checkbox-label {\r
  font-family: "Hanken Grotesk", sans-serif;\r
  font-size: var(--text-p-base-regular-size);\r
  line-height: 1.3;\r
  font-weight: 400;\r
  color: var(--font-primary-base);\r
}\r
\r
.oc-checkbox-label-sm { font-size: var(--text-p-sm-regular-size); }\r
\r
.oc-checkbox-hint {\r
  font-family: "Hanken Grotesk", sans-serif;\r
  font-size: var(--text-p-sm-regular-size);\r
  line-height: 1.3;\r
  color: var(--font-primary-muted);\r
}\r
\r
.oc-checkbox-disabled .oc-checkbox-label,\r
.oc-checkbox-disabled .oc-checkbox-hint { color: var(--font-neutral-muted); }\r

/* Tag \u2014 ported from Galactik design system */\r
\r
.oc-tag {\r
  display: inline-flex;\r
  align-items: center;\r
  gap: var(--tag-gap);\r
  padding: var(--tag-py) var(--tag-px);\r
  width: fit-content;\r
  max-width: 100%;\r
  min-width: 0;\r
  border-radius: var(--tag-radius);\r
  border-width: 1px;\r
  border-style: solid;\r
  border-color: var(--tag-stroke);\r
  background-color: var(--tag-bg);\r
  color: var(--tag-fg);\r
  font-family: "Hanken Grotesk", sans-serif;\r
  font-weight: 400;\r
  white-space: nowrap;\r
  overflow: hidden;\r
}\r
\r
.oc-tag-label {\r
  color: currentColor;\r
  min-width: 0;\r
  overflow: hidden;\r
  text-overflow: ellipsis;\r
}\r
\r
.oc-tag-icon,\r
.oc-tag-flag {\r
  display: inline-flex;\r
  align-items: center;\r
  justify-content: center;\r
  color: currentColor;\r
  flex-shrink: 0;\r
  line-height: 1;\r
}\r
\r
/* \u2500\u2500 Variants (empty \u2014 colour comes from scheme classes below) \u2500\u2500 */\r
.oc-tag-variant-primary {}\r
.oc-tag-variant-secondary {}\r
\r
/* \u2500\u2500 Sizes \u2500\u2500 */\r
\r
.oc-tag-size-medium {\r
  --tag-gap: 8px;\r
  --tag-px: 12px;\r
  --tag-py: 4px;\r
  --tag-radius: 8px;\r
  font-size: var(--text-p-base-regular-size);\r
  line-height: 20px;\r
\r
  .oc-tag-icon {\r
    width: 14px;\r
    height: 14px;\r
    font-size: 14px;\r
  }\r
\r
  .oc-tag-flag {\r
    min-width: 18px;\r
    height: 14px;\r
    font-size: 10px;\r
  }\r
}\r
\r
.oc-tag-size-small {\r
  --tag-gap: 4px;\r
  --tag-px: 8px;\r
  --tag-py: 4px;\r
  --tag-radius: 8px;\r
  font-size: var(--text-p-sm-regular-size);\r
  line-height: 16px;\r
\r
  .oc-tag-icon {\r
    width: 12px;\r
    height: 12px;\r
    font-size: 12px;\r
  }\r
\r
  .oc-tag-flag {\r
    min-width: 16px;\r
    height: 12px;\r
    font-size: 9px;\r
  }\r
}\r
\r
.oc-tag-size-xsmall {\r
  --tag-gap: 4px;\r
  --tag-px: 4px;\r
  --tag-py: 2px;\r
  --tag-radius: 4px;\r
  font-size: var(--text-p-sm-regular-size);\r
  line-height: 16px;\r
\r
  .oc-tag-icon {\r
    width: 12px;\r
    height: 12px;\r
    font-size: 12px;\r
  }\r
\r
  .oc-tag-flag {\r
    min-width: 16px;\r
    height: 12px;\r
    font-size: 9px;\r
  }\r
}\r
\r
/* \u2500\u2500 Colour schemes \u2500\u2500 */\r
\r
/* sage */\r
.oc-tag-sage { --tag-bg: var(--bg-primary-light); --tag-fg: var(--font-primary-base); --tag-stroke: transparent; }\r
.oc-tag-sage.oc-tag-variant-secondary { --tag-bg: transparent; --tag-fg: var(--font-primary-base); --tag-stroke: var(--stroke-primary-base); }\r
\r
/* grey */\r
.oc-tag-grey { --tag-bg: var(--bg-neutral-base); --tag-fg: var(--stroke-neutral-dark); --tag-stroke: transparent; }\r
.oc-tag-grey.oc-tag-variant-secondary { --tag-bg: transparent; --tag-fg: var(--stroke-neutral-dark); --tag-stroke: var(--stroke-neutral-dark); }\r
\r
/* almond */\r
.oc-tag-almond { --tag-bg: var(--bg-secondary-light); --tag-fg: var(--font-secondary-base); --tag-stroke: transparent; }\r
.oc-tag-almond.oc-tag-variant-secondary { --tag-bg: transparent; --tag-fg: var(--font-secondary-base-alt); --tag-stroke: var(--stroke-secondary-base); }\r
\r
/* yellow */\r
.oc-tag-yellow { --tag-bg: var(--bg-yellow-base-alt); --tag-fg: var(--font-yellow-base); --tag-stroke: transparent; }\r
.oc-tag-yellow.oc-tag-variant-secondary { --tag-bg: transparent; --tag-fg: var(--font-yellow-base); --tag-stroke: var(--stroke-yellow-base); }\r
\r
/* pink */\r
.oc-tag-pink { --tag-bg: var(--bg-accent-base); --tag-fg: var(--font-accent-base); --tag-stroke: transparent; }\r
.oc-tag-pink.oc-tag-variant-secondary { --tag-bg: transparent; --tag-fg: var(--font-accent-muted); --tag-stroke: var(--stroke-accent-base); }\r
\r
/* cherry */\r
.oc-tag-cherry { --tag-bg: var(--bg-cherry-base); --tag-fg: var(--font-cherry-base); --tag-stroke: transparent; }\r
.oc-tag-cherry.oc-tag-variant-secondary { --tag-bg: transparent; --tag-fg: var(--font-cherry-base); --tag-stroke: var(--stroke-cherry-base); }\r
\r
/* indigo */\r
.oc-tag-indigo { --tag-bg: var(--bg-indigo-base-alt); --tag-fg: var(--font-indigo-base); --tag-stroke: transparent; }\r
.oc-tag-indigo.oc-tag-variant-secondary { --tag-bg: transparent; --tag-fg: var(--font-indigo-base); --tag-stroke: var(--stroke-indigo-base); }\r
\r
/* cyan */\r
.oc-tag-cyan { --tag-bg: var(--bg-cyan-base-alt); --tag-fg: var(--font-cyan-base); --tag-stroke: transparent; }\r
.oc-tag-cyan.oc-tag-variant-secondary { --tag-bg: transparent; --tag-fg: var(--font-cyan-base); --tag-stroke: var(--stroke-cyan-base); }\r
\r
/* success */\r
.oc-tag-success { --tag-bg: var(--bg-success-base); --tag-fg: var(--font-success-base); --tag-stroke: transparent; }\r
.oc-tag-success.oc-tag-variant-secondary { --tag-bg: transparent; --tag-fg: var(--font-success-base); --tag-stroke: var(--stroke-success-base); }\r
\r
/* warning */\r
.oc-tag-warning { --tag-bg: var(--bg-warning-base); --tag-fg: var(--font-warning-base); --tag-stroke: transparent; }\r
.oc-tag-warning.oc-tag-variant-secondary { --tag-bg: transparent; --tag-fg: var(--font-warning-base); --tag-stroke: var(--stroke-warning-base); }\r
\r
/* info */\r
.oc-tag-info { --tag-bg: var(--bg-info-base); --tag-fg: var(--font-info-base); --tag-stroke: transparent; }\r
.oc-tag-info.oc-tag-variant-secondary { --tag-bg: transparent; --tag-fg: var(--font-info-base); --tag-stroke: var(--stroke-info-base); }\r
\r
/* error */\r
.oc-tag-error { --tag-bg: var(--bg-error-base); --tag-fg: var(--font-error-base); --tag-stroke: transparent; }\r
.oc-tag-error.oc-tag-variant-secondary { --tag-bg: transparent; --tag-fg: var(--font-error-base); --tag-stroke: var(--stroke-error-base); }\r

/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\r
   Inline input tags (@mention selections)\r
\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\r
\r
.lq-input-tag {\r
  font-size: var(--text-p-base-regular-size);\r
  vertical-align: middle;\r
  cursor: default;\r
  user-select: none;\r
  height: 20px;\r
  padding-inline: var(--space-3xs);\r
}\r
\r
.lq-input-tag .oc-tag-icon svg {\r
  width: 16px;\r
  height: 16px;\r
  display: block;\r
}\r
\r
.lq-agent-mention {\r
  font-weight: 600;\r
  color: var(--font-secondary-base-alt);\r
  cursor: default;\r
}\r

/* \u2500\u2500 Tooltip bubble (portaled to document.body, position: fixed) \u2500\u2500 */\r
.oc-tooltip {\r
  position: fixed;\r
  background: var(--bg-primary-base);\r
  color: var(--font-neutral-white);\r
  font-family: "Hanken Grotesk", sans-serif;\r
  font-size: var(--text-p-sm-regular-size); line-height: var(--text-p-sm-regular-line-height); font-weight: var(--text-p-sm-regular-weight);\r
  font-weight: 700;\r
  white-space: nowrap;\r
  padding: var(--space-3xs) var(--space-2xs);\r
  border-radius: var(--radius-xs);\r
  pointer-events: none;\r
  z-index: 9999;\r
}\r
\r
/* \u2500\u2500 Arrow \u2500\u2500 */\r
.oc-tooltip::after {\r
  content: '';\r
  position: absolute;\r
  border-style: solid;\r
  border-color: transparent;\r
}\r
\r
/* top \u2192 arrow points down */\r
.oc-tooltip-placement-top::after {\r
  top: 100%;\r
  left: 50%;\r
  transform: translateX(-50%);\r
  border-width: 5px 5px 0;\r
  border-top-color: var(--bg-primary-base);\r
}\r
\r
/* bottom \u2192 arrow points up */\r
.oc-tooltip-placement-bottom::after {\r
  bottom: 100%;\r
  left: 50%;\r
  transform: translateX(-50%);\r
  border-width: 0 5px 5px;\r
  border-bottom-color: var(--bg-primary-base);\r
}\r
\r
/* left \u2192 arrow points right */\r
.oc-tooltip-placement-left::after {\r
  left: 100%;\r
  top: 50%;\r
  transform: translateY(-50%);\r
  border-width: 5px 0 5px 5px;\r
  border-left-color: var(--bg-primary-base);\r
}\r
\r
/* right \u2192 arrow points left */\r
.oc-tooltip-placement-right::after {\r
  right: 100%;\r
  top: 50%;\r
  transform: translateY(-50%);\r
  border-width: 5px 5px 5px 0;\r
  border-right-color: var(--bg-primary-base);\r
}\r

@charset "UTF-8";\r
/* \u2500\u2500 Avatar component \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */\r
\r
/* \u2500\u2500 Base \u2500\u2500 */\r
.oc-avatar {\r
  display: inline-flex;\r
  align-items: center;\r
  justify-content: center;\r
  border-radius: 50%;\r
  background-color: var(--avatar-bg);\r
  color: var(--avatar-color);\r
  flex-shrink: 0;\r
  overflow: hidden;\r
}\r
\r
/* \u2500\u2500 Sizes \u2500\u2500 */\r
.oc-avatar-size-large  { width: 40px; height: 40px; }\r
.oc-avatar-size-medium { width: 32px; height: 32px; }\r
.oc-avatar-size-small  { width: 24px; height: 24px; }\r
\r
/* \u2500\u2500 Fallback wrapper \u2500\u2500 */\r
.oc-avatar-fallback {\r
  width: 100%;\r
  height: 100%;\r
  display: inline-flex;\r
  align-items: center;\r
  justify-content: center;\r
  line-height: 1;\r
}\r
\r
/* \u2500\u2500 Initials \u2500\u2500 */\r
.oc-avatar-initials {\r
  font-family: 'Hanken Grotesk', sans-serif;\r
  font-weight: 600;\r
  line-height: 1;\r
  letter-spacing: 0;\r
  user-select: none;\r
}\r
.oc-avatar-size-large  .oc-avatar-initials { font-size: var(--text-p-sm-regular-size); }\r
.oc-avatar-size-medium .oc-avatar-initials { font-size: 11px; }\r
.oc-avatar-size-small  .oc-avatar-initials { font-size: 10px; }\r
\r
/* \u2500\u2500 Image \u2500\u2500 */\r
.oc-avatar-img {\r
  width: 100%;\r
  height: 100%;\r
  object-fit: cover;\r
  border-radius: 50%;\r
}\r
\r
/* \u2500\u2500 Icon \u2500\u2500 */\r
.oc-avatar-icon {\r
  display: inline-flex;\r
  align-items: center;\r
  justify-content: center;\r
  line-height: 1;\r
  color: currentColor;\r
}\r
.oc-avatar-size-large  .oc-avatar-icon { font-size: 16px; }\r
.oc-avatar-size-medium .oc-avatar-icon { font-size: 14px; }\r
.oc-avatar-size-small  .oc-avatar-icon { font-size: 12px; }\r
\r
/* \u2500\u2500 Variant: primary (dark fill) \u2500\u2500 */\r
.oc-avatar-variant-primary.oc-avatar-color-sage    { --avatar-bg: var(--bg-primary-base);     --avatar-color: var(--font-neutral-white);  }\r
.oc-avatar-variant-primary.oc-avatar-color-almond  { --avatar-bg: var(--bg-secondary-base);   --avatar-color: var(--font-neutral-white);  }\r
.oc-avatar-variant-primary.oc-avatar-color-pink    { --avatar-bg: var(--bg-accent-base-alt);  --avatar-color: var(--font-accent-pressed); }\r
.oc-avatar-variant-primary.oc-avatar-color-grey,\r
.oc-avatar-variant-primary.oc-avatar-color-neutral { --avatar-bg: var(--bg-neutral-base-alt); --avatar-color: var(--font-neutral-white);  }\r
.oc-avatar-variant-primary.oc-avatar-color-blue    { --avatar-bg: var(--bg-info-base-alt);    --avatar-color: var(--font-neutral-white);  }\r
.oc-avatar-variant-primary.oc-avatar-color-indigo  { --avatar-bg: var(--bg-indigo-base);      --avatar-color: var(--font-neutral-white);  }\r
.oc-avatar-variant-primary.oc-avatar-color-cyan    { --avatar-bg: var(--bg-cyan-base);        --avatar-color: var(--font-neutral-white);  }\r
.oc-avatar-variant-primary.oc-avatar-color-green   { --avatar-bg: var(--bg-success-base-alt); --avatar-color: var(--font-neutral-white);  }\r
.oc-avatar-variant-primary.oc-avatar-color-red     { --avatar-bg: var(--bg-error-base-alt);   --avatar-color: var(--font-neutral-white);  }\r
.oc-avatar-variant-primary.oc-avatar-color-orange  { --avatar-bg: var(--bg-warning-base-alt); --avatar-color: var(--font-neutral-white);  }\r
.oc-avatar-variant-primary.oc-avatar-color-yellow  { --avatar-bg: var(--bg-yellow-base);      --avatar-color: var(--font-neutral-white);  }\r
.oc-avatar-variant-primary.oc-avatar-color-cherry  { --avatar-bg: var(--bg-cherry-base-alt);  --avatar-color: var(--font-neutral-white);  }\r
\r
/* \u2500\u2500 Variant: secondary (light tonal fill) \u2500\u2500 */\r
.oc-avatar-variant-secondary.oc-avatar-color-sage    { --avatar-bg: var(--bg-primary-light);   --avatar-color: var(--font-primary-base);   }\r
.oc-avatar-variant-secondary.oc-avatar-color-almond  { --avatar-bg: var(--bg-secondary-light); --avatar-color: var(--font-secondary-base); }\r
.oc-avatar-variant-secondary.oc-avatar-color-pink    { --avatar-bg: var(--bg-accent-base);     --avatar-color: var(--font-accent-base);    }\r
.oc-avatar-variant-secondary.oc-avatar-color-grey,\r
.oc-avatar-variant-secondary.oc-avatar-color-neutral { --avatar-bg: var(--bg-neutral-base);    --avatar-color: var(--font-neutral-base);   }\r
.oc-avatar-variant-secondary.oc-avatar-color-blue    { --avatar-bg: var(--bg-info-base);       --avatar-color: var(--font-info-base);      }\r
.oc-avatar-variant-secondary.oc-avatar-color-indigo  { --avatar-bg: var(--bg-indigo-base-alt); --avatar-color: var(--font-indigo-base);    }\r
.oc-avatar-variant-secondary.oc-avatar-color-cyan    { --avatar-bg: var(--bg-cyan-base-alt);   --avatar-color: var(--font-cyan-base);      }\r
.oc-avatar-variant-secondary.oc-avatar-color-green   { --avatar-bg: var(--bg-success-base);    --avatar-color: var(--font-success-base);   }\r
.oc-avatar-variant-secondary.oc-avatar-color-red     { --avatar-bg: var(--bg-error-base);      --avatar-color: var(--font-error-base);     }\r
.oc-avatar-variant-secondary.oc-avatar-color-orange  { --avatar-bg: var(--bg-warning-base);    --avatar-color: var(--font-warning-base);   }\r
.oc-avatar-variant-secondary.oc-avatar-color-yellow  { --avatar-bg: var(--bg-yellow-base-alt); --avatar-color: var(--font-yellow-base);    }\r
.oc-avatar-variant-secondary.oc-avatar-color-cherry  { --avatar-bg: var(--bg-cherry-base);     --avatar-color: var(--font-cherry-base);    }\r

@charset "UTF-8";\r
/* \u2500\u2500 Input component \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */\r
\r
/* \u2500\u2500 Field (label + wrap stack) \u2500\u2500 */\r
.oc-input-field {\r
  display: flex;\r
  flex-direction: column;\r
  gap: var(--space-2xs);\r
}\r
\r
.oc-input-label {\r
  font-family: 'Hanken Grotesk', sans-serif;\r
  font-size: var(--text-p-sm-regular-size);\r
  font-weight: 600;\r
  color: var(--font-primary-base);\r
  line-height: 1.3;\r
  display: flex;\r
  justify-content: space-between;\r
  align-items: baseline;\r
}\r
\r
.oc-input-label__tag {\r
  font-size: 10px;\r
  font-weight: 400;\r
  color: var(--font-neutral-muted);\r
  background: var(--bg-neutral-base);\r
  border-radius: var(--radius-xs);\r
  padding: 1px 6px;\r
  line-height: 1.4;\r
}\r
.oc-input-label__tag--required { color: var(--font-neutral-muted); }\r
.oc-input-label__tag--optional { color: var(--font-neutral-muted); }\r
\r
/* \u2500\u2500 Wrap \u2500\u2500 */\r
.oc-input-wrap {\r
  display: flex;\r
  align-items: center;\r
  gap: var(--space-xs);\r
  border: 1px solid var(--stroke-primary-light);\r
  background-color: var(--bg-neutral-white);\r
  transition: border-color 0.15s ease, background-color 0.15s ease, outline-color 0.15s ease;\r
}\r
\r
/* \u2500\u2500 Hover (default scheme) \u2500\u2500 */\r
.oc-input-wrap:hover:not(.oc-input-disabled):not(.oc-input-readonly):not(:focus-within) {\r
  border-color: var(--stroke-primary-hovered);\r
  background-color: var(--bg-primary-lighter);\r
}\r
\r
/* \u2500\u2500 Focus \u2500\u2500 */\r
.oc-input-wrap:focus-within:not(.oc-input-disabled):not(.oc-input-readonly) {\r
  border: 2px solid var(--stroke-primary-pressed);\r
  background-color: var(--bg-neutral-white);\r
  outline: none;\r
}\r
\r
/* \u2500\u2500 JS-class fallback for active \u2500\u2500 */\r
.oc-input-active {\r
  border: 2px solid var(--stroke-primary-pressed);\r
  background-color: var(--bg-neutral-white);\r
  outline: none;\r
}\r
.oc-input-active:hover:not(.oc-input-disabled):not(.oc-input-readonly) {\r
  background-color: var(--bg-neutral-white);\r
  border-color: var(--stroke-primary-pressed);\r
}\r
\r
/* \u2500\u2500 Focus visible (JS-class fallback) \u2500\u2500 */\r
.oc-input-focus-visible:not(.oc-input-disabled):not(.oc-input-readonly) {\r
  outline: 2px solid var(--stroke-focus);\r
  outline-offset: 2px;\r
}\r
\r
/* \u2500\u2500 Sizes \u2500\u2500 */\r
.oc-input-size-lg {\r
  height: 44px;\r
  padding: 0 var(--space-xl);\r
  border-radius: var(--radius-sm);\r
}\r
.oc-input-size-lg .oc-input-control { font-size: var(--text-p-base-regular-size); }\r
.oc-input-size-lg .oc-input-icon-left,\r
.oc-input-size-lg .oc-input-icon-right { font-size: 16px; }\r
.oc-input-size-lg .oc-input-counter { font-size: var(--text-p-sm-regular-size); }\r
.oc-input-size-lg .input-stepper i { font-size: 8px; }\r
\r
.oc-input-size-md {\r
  height: 36px;\r
  padding: 0 var(--space-md);\r
  border-radius: var(--radius-sm);\r
}\r
.oc-input-size-md .oc-input-control { font-size: var(--text-p-base-regular-size); }\r
.oc-input-size-md .oc-input-icon-left,\r
.oc-input-size-md .oc-input-icon-right { font-size: 16px; }\r
.oc-input-size-md .oc-input-counter { font-size: var(--text-p-sm-regular-size); }\r
.oc-input-size-md .input-stepper i { font-size: 7px; }\r
\r
.oc-input-size-sm {\r
  height: 24px;\r
  padding: 0 var(--space-xs);\r
  border-radius: var(--radius-xs);\r
}\r
.oc-input-size-sm .oc-input-control { font-size: var(--text-p-sm-regular-size); }\r
.oc-input-size-sm .oc-input-icon-left,\r
.oc-input-size-sm .oc-input-icon-right { font-size: 11px; }\r
.oc-input-size-sm .oc-input-counter { font-size: var(--text-p-sm-regular-size); }\r
.oc-input-size-sm .input-stepper i { font-size: 6px; }\r
\r
/* \u2500\u2500 Textarea variant (no fixed height, vertical padding) \u2500\u2500 */\r
.oc-input-wrap--textarea {\r
  height: auto;\r
  align-items: flex-start;\r
  padding: var(--space-xs) var(--space-md);\r
  border-radius: var(--radius-sm);\r
}\r
.oc-input-wrap--textarea .oc-input-control {\r
  font-size: var(--text-p-base-regular-size);\r
  resize: none;\r
  line-height: 22px;\r
  padding: 0;\r
}\r
\r
/* \u2500\u2500 Control (the actual input/textarea) \u2500\u2500 */\r
.oc-input-control {\r
  flex: 1;\r
  min-width: 0;\r
  border: none;\r
  background: transparent;\r
  font-family: 'Hanken Grotesk', sans-serif;\r
  color: var(--font-primary-base);\r
  line-height: 1.4;\r
  padding: 0;\r
}\r
.oc-input-control::placeholder { color: var(--font-primary-muted); }\r
.oc-input-control:focus,\r
.oc-input-control:focus-visible { outline: none; }\r
.oc-input-control:read-only { cursor: default; }\r
\r
/* \u2500\u2500 Icon slots \u2500\u2500 */\r
.oc-input-icon-left,\r
.oc-input-icon-right {\r
  display: inline-flex;\r
  align-items: center;\r
  justify-content: center;\r
  flex-shrink: 0;\r
  color: var(--font-primary-muted);\r
}\r
\r
/* \u2500\u2500 Counter \u2500\u2500 */\r
.oc-input-counter {\r
  font-family: 'Hanken Grotesk', sans-serif;\r
  color: var(--font-neutral-muted);\r
  white-space: nowrap;\r
  flex-shrink: 0;\r
}\r
.oc-input-counter-error { color: var(--font-error-base); }\r
\r
/* \u2500\u2500 Hint \u2500\u2500 */\r
.oc-input-hint {\r
  font-family: 'Hanken Grotesk', sans-serif;\r
  font-size: var(--text-p-sm-regular-size);\r
  color: var(--font-primary-muted);\r
  line-height: 1.4;\r
  margin: 0;\r
}\r
.oc-input-hint-success { color: var(--font-success-base); }\r
.oc-input-hint-error   { color: var(--font-error-base); }\r
\r
\r
/* \u2500\u2500 Stepper (preview-only static element) \u2500\u2500 */\r
.input-stepper {\r
  display: inline-flex;\r
  flex-direction: column;\r
  align-items: center;\r
  justify-content: center;\r
  flex-shrink: 0;\r
  color: var(--font-primary-muted);\r
  gap: 1px;\r
  line-height: 1;\r
}\r
.input-stepper i { line-height: 1; }\r
\r
/* \u2500\u2500 Text display (preview-only, replaces <input>) \u2500\u2500 */\r
.input-text-display {\r
  flex: 1;\r
  min-width: 0;\r
  font-family: 'Hanken Grotesk', sans-serif;\r
  font-size: inherit;\r
  color: var(--font-primary-base);\r
  white-space: nowrap;\r
  overflow: hidden;\r
  text-overflow: ellipsis;\r
  line-height: 1.4;\r
}\r
.input-text-display.is-placeholder { color: var(--font-primary-muted); }\r
\r
/* \u2500\u2500 Filled visual variant \u2500\u2500 */\r
.oc-input-filled {\r
  background-color: var(--bg-primary-lighter);\r
  border-color: transparent;\r
}\r
.oc-input-filled:hover:not(.oc-input-disabled):not(.oc-input-readonly):not(:focus-within) {\r
  background-color: var(--bg-primary-light);\r
  border-color: var(--stroke-primary-hovered);\r
}\r
.oc-input-filled:focus-within:not(.oc-input-disabled):not(.oc-input-readonly) {\r
  background-color: var(--bg-neutral-white);\r
  border: 2px solid var(--stroke-primary-pressed);\r
}\r
.oc-input-filled.oc-input-active {\r
  background-color: var(--bg-neutral-white);\r
  border: 2px solid var(--stroke-primary-pressed);\r
}\r
.oc-input-filled.oc-input-scheme-success { background-color: var(--bg-success-base); border-color: transparent; }\r
.oc-input-filled.oc-input-scheme-error   { background-color: var(--bg-error-base);   border-color: transparent; }\r
\r
/* \u2500\u2500 Read only \u2500\u2500 */\r
.oc-input-readonly {\r
  background-color: var(--bg-neutral-base);\r
  border-color: transparent;\r
  cursor: default;\r
}\r
.oc-input-readonly:hover {\r
  border-color: transparent !important;\r
  background-color: var(--bg-neutral-base) !important;\r
}\r
.oc-input-readonly .oc-input-control,\r
.oc-input-readonly .input-text-display { color: var(--font-primary-muted); cursor: default; }\r
\r
/* \u2500\u2500 Disabled \u2500\u2500 */\r
.oc-input-disabled {\r
  background-color: var(--bg-neutral-disabled);\r
  border-color: var(--stroke-neutral-disabled);\r
  cursor: not-allowed;\r
}\r
.oc-input-disabled:hover {\r
  border-color: var(--stroke-neutral-disabled) !important;\r
  background-color: var(--bg-neutral-disabled) !important;\r
}\r
.oc-input-disabled .oc-input-control,\r
.oc-input-disabled .input-text-display { color: var(--font-neutral-muted); cursor: not-allowed; }\r
.oc-input-disabled .oc-input-icon-left,\r
.oc-input-disabled .oc-input-icon-right,\r
.oc-input-disabled .oc-input-counter,\r
.oc-input-disabled .input-stepper { color: var(--font-neutral-muted); }\r
\r
/* \u2500\u2500 Success scheme \u2500\u2500 */\r
.oc-input-scheme-success {\r
  border-color: var(--stroke-success-base);\r
  background-color: var(--bg-neutral-white);\r
}\r
.oc-input-scheme-success:hover:not(.oc-input-disabled):not(.oc-input-readonly):not(:focus-within) {\r
  background-color: var(--bg-success-lightest);\r
  border-color: var(--stroke-success-base);\r
}\r
.oc-input-scheme-success:focus-within:not(.oc-input-disabled):not(.oc-input-readonly) {\r
  border: 2px solid var(--stroke-success-base);\r
  background-color: var(--bg-neutral-white);\r
}\r
.oc-input-scheme-success.oc-input-active {\r
  border: 2px solid var(--stroke-success-base);\r
  background-color: var(--bg-neutral-white);\r
}\r
.oc-input-scheme-success .oc-input-control,\r
.oc-input-scheme-success .input-text-display { color: var(--font-success-base); }\r
.oc-input-scheme-success .oc-input-icon-left,\r
.oc-input-scheme-success .oc-input-icon-right,\r
.oc-input-scheme-success .input-stepper { color: var(--font-success-base); }\r
.oc-input-scheme-success .oc-input-counter { color: var(--font-success-base); }\r
\r
/* \u2500\u2500 Error scheme \u2500\u2500 */\r
.oc-input-scheme-error {\r
  border-color: var(--stroke-error-base);\r
  background-color: var(--bg-neutral-white);\r
}\r
.oc-input-scheme-error:hover:not(.oc-input-disabled):not(.oc-input-readonly):not(:focus-within) {\r
  background-color: var(--bg-error-lightest);\r
  border-color: var(--stroke-error-base);\r
}\r
.oc-input-scheme-error:focus-within:not(.oc-input-disabled):not(.oc-input-readonly) {\r
  border: 2px solid var(--stroke-error-base);\r
  background-color: var(--bg-neutral-white);\r
}\r
.oc-input-scheme-error.oc-input-active {\r
  border: 2px solid var(--stroke-error-base);\r
  background-color: var(--bg-neutral-white);\r
}\r
.oc-input-scheme-error .oc-input-control,\r
.oc-input-scheme-error .input-text-display { color: var(--font-error-base); }\r
.oc-input-scheme-error .oc-input-icon-left,\r
.oc-input-scheme-error .oc-input-icon-right,\r
.oc-input-scheme-error .input-stepper { color: var(--font-error-base); }\r
.oc-input-scheme-error .oc-input-counter { color: var(--font-error-base); }\r
\r
/* \u2500\u2500 Sim states (preview only) \u2500\u2500 */\r
.sim-hover:not(.oc-input-disabled):not(.oc-input-readonly) {\r
  border-color: var(--stroke-primary-hovered);\r
  background-color: var(--bg-primary-lighter);\r
}\r
.sim-hover.oc-input-filled:not(.oc-input-disabled):not(.oc-input-readonly) {\r
  background-color: var(--bg-primary-light);\r
  border-color: var(--stroke-primary-hovered);\r
}\r
.sim-hover.oc-input-scheme-success:not(.oc-input-disabled):not(.oc-input-readonly) {\r
  background-color: var(--bg-success-lightest);\r
  border-color: var(--stroke-success-base);\r
}\r
.sim-hover.oc-input-scheme-error:not(.oc-input-disabled):not(.oc-input-readonly) {\r
  background-color: var(--bg-error-lightest);\r
  border-color: var(--stroke-error-base);\r
}\r
.sim-hover.oc-input-scheme-error.oc-input-filled:not(.oc-input-disabled):not(.oc-input-readonly) {\r
  background-color: var(--bg-error-lightest);\r
  border-color: transparent;\r
}\r
\r
.sim-focus:not(.oc-input-disabled):not(.oc-input-readonly) {\r
  outline: 2px solid var(--stroke-focus);\r
  outline-offset: 2px;\r
  border-color: var(--stroke-primary-light);\r
  background-color: var(--bg-neutral-white);\r
}\r
.sim-focus.oc-input-filled:not(.oc-input-disabled):not(.oc-input-readonly) {\r
  border-color: transparent;\r
}\r
\r
@media (prefers-reduced-motion: reduce) {\r
  .oc-input-wrap { transition: none; }\r
}\r

@charset "UTF-8";\r
/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\r
   LexiQ Separator Component\r
   Ported from galactik-design-react Separator\r
\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\r
.oc-separator {\r
  flex-shrink: 0;\r
  background: var(--stroke-neutral-white);\r
}\r
\r
.oc-separator--strong {\r
  background: var(--stroke-primary-base);\r
}\r
\r
.oc-separator--horizontal {\r
  width: 100%;\r
  height: 1px;\r
}\r
\r
.oc-separator--vertical {\r
  width: 1px;\r
  min-height: 1em;\r
  align-self: stretch;\r
}\r
\r
.oc-separator--horizontal.oc-separator--spacing-none  { margin-block: 0; }\r
.oc-separator--horizontal.oc-separator--spacing-sm    { margin-block: var(--space-2xs); }\r
.oc-separator--horizontal.oc-separator--spacing-md    { margin-block: var(--space-xs); }\r
.oc-separator--horizontal.oc-separator--spacing-lg    { margin-block: var(--space-sm); }\r
\r
.oc-separator--vertical.oc-separator--spacing-none    { margin-inline: 0; }\r
.oc-separator--vertical.oc-separator--spacing-sm      { margin-inline: var(--space-2xs); }\r
.oc-separator--vertical.oc-separator--spacing-md      { margin-inline: var(--space-xs); }\r
.oc-separator--vertical.oc-separator--spacing-lg      { margin-inline: var(--space-sm); }\r

/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\r
   LexiQ Button System\r
\r
   Variants:  .lq-btn--primary\r
              .lq-btn--accent\r
              .lq-btn--secondary\r
              .lq-btn--tertiary\r
              .lq-btn--tertiary-neutral\r
\r
   Sizes:     .lq-btn--lg   (h=44px, text=h3,            icon=16px)\r
              .lq-btn--md   (h=36px, text=p-base-regular, icon=14px)\r
              .lq-btn--sm   (h=24px, text=p-sm-regular,   icon=12px)\r
\r
   Modifier:  .lq-btn--icon  \u2192  square icon-only button\r
\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\r
\r
/* \u2500\u2500 Base reset \u2500\u2500 */\r
.lq-btn {\r
  --lq-btn-disabled-fg: #434F5B;\r
  display: inline-flex;\r
  align-items: center;\r
  justify-content: center;\r
  border: none;\r
  cursor: pointer;\r
  border-radius: var(--radius-rounded);\r
  transition: background 0.15s, color 0.15s, border-color 0.15s;\r
  white-space: nowrap;\r
  font-family: inherit;\r
  text-decoration: none;\r
  flex-shrink: 0;\r
  -webkit-user-select: none;\r
  user-select: none;\r
\r
  svg, i { flex-shrink: 0; }\r
\r
  &:focus-visible {\r
    outline: var(--stroke-sm) solid var(--stroke-focus);\r
    outline-offset: 2px;\r
  }\r
\r
  &:disabled {\r
    cursor: not-allowed;\r
    pointer-events: none;\r
  }\r
\r
  &[aria-disabled="true"] {\r
    cursor: not-allowed;\r
    pointer-events: none;\r
  }\r
}\r
\r
/* \u2500\u2500 Pressed: bold weight only, no size change \u2500\u2500 */\r
.lq-btn:active {\r
  font-weight: var(--text-h4-weight);\r
}\r
\r
\r
/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\r
   SIZES\r
\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\r
\r
/* \u2500\u2500 Large: 44px \u2500\u2500 */\r
.lq-btn--lg {\r
  height: 44px;\r
  padding: 0 var(--space-lg);\r
  gap: var(--space-2xs);\r
  font-size: var(--text-h3-size); line-height: var(--text-h3-line-height); font-weight: var(--text-h3-weight);\r
\r
  svg, i { width: 16px; height: 16px; }\r
\r
  &.lq-btn--icon {\r
    width: 44px;\r
    padding: 0;\r
  }\r
}\r
\r
/* \u2500\u2500 Medium: 36px \u2500\u2500 */\r
.lq-btn--md {\r
  height: 36px;\r
  padding: 0 var(--space-md);\r
  gap: 6px;\r
  font-size: var(--text-p-base-regular-size); line-height: var(--text-p-base-regular-line-height); font-weight: var(--text-p-base-regular-weight);\r
\r
  svg, i { width: 14px; height: 14px; }\r
\r
  &.lq-btn--icon {\r
    width: 36px;\r
    padding: 0;\r
  }\r
}\r
\r
/* \u2500\u2500 Small: 24px \u2500\u2500 */\r
.lq-btn--sm {\r
  height: 24px;\r
  padding: 0 var(--space-2xs);\r
  gap: var(--space-3xs);\r
  font-size: var(--text-p-sm-regular-size); line-height: var(--text-p-sm-regular-line-height); font-weight: var(--text-p-sm-regular-weight);\r
\r
  svg, i { width: 12px; height: 12px; }\r
\r
  &.lq-btn--icon {\r
    width: 24px;\r
    padding: 0;\r
  }\r
}\r
\r
\r
/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\r
   VARIANT: Primary  \u2014  filled sage\r
   bg/text follow --bg-primary-* / white\r
\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\r
.lq-btn--primary {\r
  background: var(--bg-primary-base);\r
  color: var(--font-neutral-white);\r
\r
  &:hover {\r
    background: var(--bg-primary-hovered);\r
    color: var(--font-neutral-white);\r
  }\r
\r
  &:active {\r
    background: var(--bg-primary-pressed);\r
    color: var(--font-primary-pressed);\r
  }\r
\r
  &:disabled,\r
  &[aria-disabled="true"] {\r
    background: var(--bg-neutral-disabled);\r
    color: var(--lq-btn-disabled-fg);\r
  }\r
}\r
\r
\r
/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\r
   VARIANT: Accent  \u2014  filled pink/purple\r
   bg/text follow --bg-accent-* / --font-accent-*\r
\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\r
.lq-btn--accent {\r
  background: var(--bg-accent-base-alt);\r
  color: var(--font-accent-base);\r
\r
  &:hover {\r
    background: var(--bg-accent-hover);\r
    color: var(--font-accent-base);\r
  }\r
\r
  &:active {\r
    background: var(--bg-accent-pressed);\r
    color: var(--font-accent-pressed);\r
  }\r
\r
  &:disabled,\r
  &[aria-disabled="true"] {\r
    background: var(--bg-neutral-disabled);\r
    color: var(--lq-btn-disabled-fg);\r
  }\r
}\r
\r
\r
/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\r
   VARIANT: Secondary  \u2014  outlined, primary palette\r
   Default: transparent bg + primary-base stroke + primary-base text\r
   Hover:   lighter bg + hovered stroke + hovered text\r
   Pressed: light bg   + pressed stroke + pressed text\r
\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\r
.lq-btn--secondary {\r
  background: transparent;\r
  border: var(--stroke-xs) solid var(--stroke-primary-base);\r
  color: var(--font-primary-base);\r
\r
  &:hover {\r
    background: var(--bg-primary-lighter);\r
    border-color: var(--stroke-primary-hovered);\r
    color: var(--font-primary-hovered);\r
  }\r
\r
  &:active {\r
    background: var(--bg-primary-light);\r
    border-color: var(--stroke-primary-pressed);\r
    color: var(--font-primary-pressed);\r
  }\r
\r
  &:disabled,\r
  &[aria-disabled="true"] {\r
    background: transparent;\r
    border-color: var(--stroke-neutral-disabled);\r
    color: var(--lq-btn-disabled-fg);\r
  }\r
}\r
\r
\r
/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\r
   VARIANT: Tertiary  \u2014  ghost, secondary (almond/green) palette\r
   Base:    secondary-base text, no bg\r
   Hover:   secondary-lighter bg\r
   Pressed: secondary-light bg\r
\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\r
.lq-btn--tertiary {\r
  background: transparent;\r
  color: var(--font-secondary-base-alt);\r
\r
  &:hover {\r
    background: var(--bg-secondary-lighter);\r
    color: var(--font-secondary-hovered);\r
  }\r
\r
  &:active {\r
    background: var(--bg-secondary-light);\r
    color: var(--font-secondary-pressed);\r
  }\r
\r
  &:disabled,\r
  &[aria-disabled="true"] {\r
    color: var(--lq-btn-disabled-fg);\r
  }\r
}\r
\r
/* \u2500\u2500 Tertiary Neutral  \u2014  neutral black default, secondary states otherwise \u2500\u2500 */\r
.lq-btn--tertiary-neutral {\r
  background: transparent;\r
  color: var(--font-neutral-black);\r
\r
  &:hover {\r
    background: var(--bg-secondary-lighter);\r
    color: var(--font-secondary-hovered);\r
  }\r
\r
  &:active {\r
    background: var(--bg-secondary-light);\r
    color: var(--font-secondary-pressed);\r
  }\r
\r
  &:disabled,\r
  &[aria-disabled="true"] {\r
    color: var(--lq-btn-disabled-fg);\r
  }\r
}\r
\r
/* \u2500\u2500 Secondary Danger  \u2014  outlined, error palette \u2500\u2500 */\r
.lq-btn--secondary-danger {\r
  background: transparent;\r
  border: var(--stroke-xs) solid var(--stroke-error-base, #EF4444);\r
  color: var(--font-error-base);\r
\r
  &:hover {\r
    background: var(--bg-error-lightest);\r
    border-color: var(--stroke-error-base, #EF4444);\r
    color: var(--font-error-base);\r
  }\r
\r
  &:active {\r
    background: var(--bg-error-base-alt);\r
    border-color: var(--stroke-error-base, #EF4444);\r
    color: var(--font-error-base);\r
  }\r
\r
  &:disabled,\r
  &[aria-disabled="true"] {\r
    background: transparent;\r
    border-color: var(--stroke-neutral-disabled);\r
    color: var(--lq-btn-disabled-fg);\r
  }\r
}\r
\r
/* \u2500\u2500 Ghost Danger  \u2014  transparent default, danger on hover/press \u2500\u2500 */\r
.lq-btn--ghost-danger {\r
  background: transparent;\r
  color: var(--font-error-base);\r
\r
  &:hover {\r
    background: var(--bg-error-base);\r
    color: #fff;\r
  }\r
\r
  &:active {\r
    background: var(--color-red-700);\r
    color: #fff;\r
  }\r
\r
  &:disabled,\r
  &[aria-disabled="true"] {\r
    color: var(--lq-btn-disabled-fg);\r
  }\r
}\r
\r
/* \u2500\u2500 Busy state (async submit in flight, see setButtonBusy() in\r
   internal/dom-utils.ts) \u2014 the ring uses currentColor so it matches\r
   whichever variant it's rendered on without per-variant overrides. \u2500\u2500 */\r
.lq-btn__spinner {\r
  display: inline-block;\r
  width: 14px;\r
  height: 14px;\r
  border-radius: 50%;\r
  border: 2px solid color-mix(in srgb, currentColor 25%, transparent);\r
  border-top-color: currentColor;\r
  animation: lq-spin 0.7s linear infinite;\r
}\r

/* \u2500\u2500 Resize handle \u2014 sits between workspace and detail panel \u2500\u2500 */\r
.lq-resize-handle {\r
  display: none;\r
  flex-shrink: 0;\r
  width: var(--space-xs);\r
  align-self: stretch;\r
  cursor: col-resize;\r
  align-items: center;\r
  justify-content: center;\r
}\r
.lq-resize-handle--visible {\r
  display: flex;\r
}\r
.lq-resize-handle::after {\r
  content: "";\r
  width: 2px;\r
  height: 24px;\r
  border-radius: 1px;\r
  background: var(--stroke-neutral-light, #e5e6e8);\r
  opacity: 0;\r
  transition: opacity 0.15s ease;\r
}\r
.lq-resize-handle:hover::after {\r
  opacity: 1;\r
}\r
\r
/* \u2500\u2500 Detail panel \u2014 right card inside the main panel \u2500\u2500 */\r
.lq-detail-panel {\r
  flex-shrink: 0;\r
  width: 0;\r
  overflow: hidden;\r
  background: var(--bg-neutral-white, #fff);\r
  border-radius: var(--radius-xl);\r
  transition: width 0.35s cubic-bezier(0.32, 0.72, 0, 1);\r
  display: flex;\r
  flex-direction: column;\r
  position: relative;\r
}\r
\r
.lq-detail-panel--open {\r
  width: 50%;\r
  border: var(--stroke-xs, 1px) solid var(--stroke-neutral-white);\r
  box-shadow: 0 4px 6px -2px rgba(45, 57, 58, 0.05), 0 10px 15px -3px rgba(45, 57, 58, 0.1);\r
}\r
\r
/* \u2500\u2500 Document preview container \u2500\u2500 */\r
.lq-dp-doc-preview {\r
  display: flex;\r
  flex-direction: column;\r
  flex: 1;\r
  min-height: 0;\r
  overflow: hidden;\r
}\r
.lq-dp-doc-preview[hidden] {\r
  display: none !important;\r
}\r
\r
/* \u2500\u2500 Preview header \u2500\u2500 */\r
.lq-dp-doc-preview__header {\r
  display: flex;\r
  flex-direction: column;\r
  gap: var(--space-2xs);\r
  padding: var(--space-md);\r
  border-bottom: 1px solid var(--stroke-neutral-white, #f2f2f3);\r
  flex-shrink: 0;\r
}\r
\r
/* Title row */\r
.lq-dp-doc-preview__title-row {\r
  display: flex;\r
  align-items: center;\r
  gap: var(--space-2xs);\r
  min-width: 0;\r
}\r
\r
/* oc-link override: truncate label, keep icon visible */\r
.lq-dp-doc-preview__title-link {\r
  flex: 1;\r
  min-width: 0;\r
  font-size: var(--text-h5-size);\r
  line-height: var(--text-h5-line-height);\r
  font-weight: var(--text-h5-weight);\r
}\r
.lq-dp-doc-preview__title-link .oc-link-label {\r
  overflow: hidden;\r
  text-overflow: ellipsis;\r
  white-space: nowrap;\r
  min-width: 0;\r
}\r
.lq-dp-doc-preview__title-link .oc-link-icon-right {\r
  opacity: 0;\r
  transition: opacity 0.15s ease;\r
}\r
.lq-dp-doc-preview__title-link:hover .oc-link-icon-right {\r
  opacity: 1;\r
}\r
\r
.lq-dp-doc-preview__actions {\r
  display: flex;\r
  align-items: center;\r
  gap: var(--space-3xs);\r
  flex-shrink: 0;\r
  margin-left: auto;\r
}\r
\r
/* Metadata column */\r
.lq-dp-doc-preview__meta {\r
  display: flex;\r
  flex-direction: column;\r
  gap: var(--space-3xs);\r
  min-width: 0;\r
}\r
\r
.lq-dp-doc-preview__meta-row {\r
  display: flex;\r
  align-items: center;\r
  gap: var(--space-3xs);\r
  font-size: var(--text-p-sm-regular-size);\r
  line-height: var(--text-p-sm-regular-line-height);\r
  font-weight: var(--text-p-sm-regular-weight);\r
  color: var(--font-neutral-muted, #596978);\r
  min-width: 0;\r
}\r
.lq-dp-doc-preview__meta-row > svg, .lq-dp-doc-preview__meta-row > i {\r
  width: 14px;\r
  height: 14px;\r
  flex-shrink: 0;\r
}\r
\r
.lq-dp-doc-preview__meta-label {\r
  font-weight: var(--text-h5-weight);\r
  flex-shrink: 0;\r
}\r
\r
/* Search + follow-up + doc controls row */\r
.lq-dp-doc-preview__search-row {\r
  display: flex;\r
  align-items: center;\r
  gap: var(--space-xs);\r
  flex-wrap: wrap;\r
  /* search bar grows but caps at a sensible width */\r
}\r
.lq-dp-doc-preview__search-row .oc-sb {\r
  flex: 1;\r
  min-width: 100px;\r
  max-width: 220px;\r
}\r
\r
/* Right-side document controls cluster \u2014 pushed to far right */\r
.lq-dp-doc-preview__doc-controls {\r
  display: flex;\r
  align-items: center;\r
  gap: var(--space-3xs);\r
  flex-shrink: 0;\r
  margin-left: auto;\r
}\r
\r
/* Page indicator \u2014 oc-input-wrap override for compact inline use */\r
.lq-dp-doc-preview__page-ctrl {\r
  gap: 4px;\r
  white-space: nowrap;\r
  width: auto;\r
  cursor: text;\r
  font-size: var(--text-p-sm-regular-size);\r
  line-height: 1.4;\r
}\r
\r
.lq-dp-doc-preview__page-current {\r
  flex: 0 0 auto;\r
  width: 2ch;\r
  text-align: center;\r
  font-weight: var(--text-h5-weight);\r
  font-size: inherit;\r
  line-height: inherit;\r
  height: auto;\r
  padding: 0;\r
  cursor: text;\r
}\r
\r
.lq-dp-doc-preview__page-sep,\r
.lq-dp-doc-preview__page-total {\r
  color: var(--font-primary-muted);\r
  flex-shrink: 0;\r
  font-size: inherit;\r
  line-height: inherit;\r
}\r
\r
.lq-dp-doc-preview__zoom-label {\r
  font-size: var(--text-p-sm-regular-size);\r
  color: var(--font-primary-muted);\r
  min-width: 3ch;\r
  text-align: center;\r
  flex-shrink: 0;\r
  user-select: none;\r
}\r
\r
/* \u2500\u2500 Preview body \u2500\u2500 */\r
.lq-dp-doc-preview__body {\r
  flex: 1;\r
  min-height: 0;\r
  overflow: auto;\r
  padding-top: var(--space-lg);\r
  background: var(--bg-neutral-base);\r
  display: flex;\r
  flex-direction: column;\r
}\r
\r
.lq-dp-doc-preview__pages {\r
  display: flex;\r
  flex-direction: column;\r
  padding: var(--space-xl) var(--space-md) var(--space-md);\r
  align-items: center;\r
  gap: var(--space-md);\r
  transform-origin: top center;\r
}\r
\r
.lq-dp-doc-preview__page {\r
  position: relative;\r
  background: #fff;\r
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(0, 0, 0, 0.06);\r
  border-radius: 2px;\r
  width: 640px;\r
  min-height: 905px;\r
  padding: 64px 72px;\r
  box-sizing: border-box;\r
  flex-shrink: 0;\r
}\r
.lq-dp-doc-preview__page h1 {\r
  font-size: 22px;\r
  font-weight: 700;\r
  line-height: 1.3;\r
  margin: 0 0 20px;\r
  color: var(--font-primary-default);\r
}\r
.lq-dp-doc-preview__page h2 {\r
  font-size: 17px;\r
  font-weight: 700;\r
  line-height: 1.3;\r
  margin: 28px 0 10px;\r
  color: var(--font-primary-default);\r
}\r
.lq-dp-doc-preview__page h3 {\r
  font-size: 14px;\r
  font-weight: 600;\r
  line-height: 1.4;\r
  margin: 20px 0 8px;\r
  color: var(--font-primary-default);\r
}\r
.lq-dp-doc-preview__page p {\r
  font-size: 13px;\r
  line-height: 1.7;\r
  margin: 0 0 14px;\r
  color: var(--font-primary-default);\r
}\r
.lq-dp-doc-preview__page ul {\r
  font-size: 13px;\r
  line-height: 1.7;\r
  margin: 0 0 14px;\r
  padding-left: 20px;\r
  color: var(--font-primary-default);\r
}\r
.lq-dp-doc-preview__page ul li {\r
  margin-bottom: 6px;\r
}\r
\r
.lq-dp-doc-preview__page-num {\r
  position: absolute;\r
  bottom: 24px;\r
  right: 32px;\r
  font-size: 11px;\r
  color: var(--font-primary-muted);\r
}\r
\r
.lq-dp-search-nav {\r
  display: none;\r
  align-items: center;\r
  gap: var(--space-2xs);\r
  flex-shrink: 0;\r
  padding-left: var(--space-2xs);\r
  border-left: 1px solid var(--stroke-primary-lighter);\r
  margin-left: var(--space-3xs);\r
}\r
.lq-dp-search-nav.lq-dp-search-nav--active {\r
  display: inline-flex;\r
}\r
\r
.lq-dp-search-nav__arrows {\r
  display: flex;\r
  flex-direction: column;\r
  gap: 0;\r
}\r
\r
.lq-dp-search-nav__btn {\r
  background: transparent;\r
  border: none;\r
  cursor: pointer;\r
  color: var(--font-primary-muted);\r
  display: flex;\r
  align-items: center;\r
  justify-content: center;\r
  border-radius: var(--radius-sm);\r
  line-height: 1;\r
}\r
.lq-dp-search-nav__btn svg {\r
  transition: transform 0.18s cubic-bezier(0.34, 1.56, 0.64, 1);\r
}\r
.lq-dp-search-nav__btn:hover svg {\r
  transform: scale(1.2);\r
}\r
.lq-dp-search-nav__btn:active {\r
  color: var(--font-neutral-black, #182021);\r
}\r
\r
.lq-dp-search-nav__count {\r
  font-size: var(--text-p-sm-regular-size);\r
  color: var(--font-primary-muted);\r
  white-space: nowrap;\r
  min-width: 2ch;\r
  text-align: center;\r
}\r
\r
mark.lq-dp-search-highlight {\r
  background: rgba(234, 179, 8, 0.25);\r
  color: inherit;\r
  border-radius: 2px;\r
  padding: 0 1px;\r
}\r
\r
mark.lq-dp-search-highlight--current {\r
  background: #FEF08A;\r
  outline: 2px solid #EAB308;\r
  outline-offset: 1px;\r
}\r

// Vendored from lexiq-prototype scss/components.scss \u2014 only the selectors actually\r
// used by Collections (confirm/action modals, danger list item, share notice,\r
// spin keyframe, save/copy-label feedback keyframes+classes).\r
\r
/* \u2500\u2500 Confirm / action modals (delete, rename, archive, share, upload, edit) \u2500\u2500 */\r
.lq-confirm-backdrop {\r
  position: fixed;\r
  inset: 0;\r
  background: rgba(24, 32, 33, 0.35);\r
  z-index: 400;\r
  opacity: 0;\r
  transition: opacity 0.2s ease;\r
}\r
.lq-confirm-backdrop.lq-confirm--open { opacity: 1; }\r
.lq-confirm-backdrop[hidden] { display: none; }\r
\r
.lq-confirm-modal {\r
  position: fixed;\r
  top: 50%;\r
  left: 50%;\r
  transform: translate(-50%, -48%) scale(0.96);\r
  z-index: 401;\r
  width: 420px;\r
  background: var(--bg-neutral-white, #fff);\r
  border-radius: var(--radius-xl);\r
  box-shadow: 0 8px 32px rgba(24, 32, 33, 0.18);\r
  opacity: 0;\r
  transition: opacity 0.2s ease, transform 0.2s cubic-bezier(0.32, 0.72, 0, 1);\r
  overflow: hidden;\r
  display: flex;\r
  flex-direction: column;\r
}\r
.lq-confirm-modal.lq-confirm--open {\r
  opacity: 1;\r
  transform: translate(-50%, -50%) scale(1);\r
}\r
.lq-confirm-modal[hidden] { display: none; }\r
\r
.lq-confirm-header {\r
  display: flex;\r
  align-items: center;\r
  justify-content: space-between;\r
  padding: var(--space-md) var(--space-xl);\r
  border-bottom: 1px solid var(--stroke-neutral-white, #F2F2F3);\r
}\r
.lq-confirm-title {\r
  font-size: var(--text-h3-size);\r
  font-weight: 700;\r
  color: var(--font-neutral-black);\r
}\r
.lq-confirm-body {\r
  padding: var(--space-xl);\r
}\r
.lq-confirm-desc {\r
  font-size: var(--text-p-base-regular-size);\r
  line-height: 22px;\r
  color: var(--font-neutral-base);\r
  margin: 0;\r
}\r
.lq-confirm-body .oc-input-wrap {\r
  width: 100%;\r
  box-sizing: border-box;\r
}\r
.lq-confirm-footer {\r
  display: flex;\r
  gap: var(--space-2xs);\r
  justify-content: flex-end;\r
  padding: var(--space-md) var(--space-xl);\r
}\r
\r
/* \u2500\u2500 Danger list item \u2014 specificity matches base :not(:disabled):hover rule \u2500\u2500 */\r
.lq-list-item--danger .oc-list-item-text,\r
.lq-list-item--danger .oc-list-item-icon { color: var(--font-error-muted); }\r
.oc-list-item.lq-list-item--danger:not(.oc-list-item-disabled):hover .oc-list-item-text,\r
.oc-list-item.lq-list-item--danger:not(.oc-list-item-disabled):hover .oc-list-item-icon { color: var(--font-error-base); }\r
.oc-list-item.lq-list-item--danger:not(.oc-list-item-disabled):hover { background-color: var(--bg-error-lightest); }\r
.oc-list-item.lq-list-item--danger:not(.oc-list-item-disabled):active { background-color: var(--bg-error-base-alt); }\r
\r
/* \u2500\u2500 Share notice banner \u2500\u2500 */\r
.lq-share-notice {\r
  display: flex;\r
  align-items: flex-start;\r
  gap: var(--space-2xs);\r
  padding: var(--space-xs) var(--space-md);\r
  background: #FFFBEE;\r
  border: 1px solid #E8D06B;\r
  border-radius: var(--radius-md);\r
}\r
.lq-share-notice svg { width: 16px; height: 16px; flex-shrink: 0; color: #8A6A00; margin-top: 1px; }\r
.lq-share-notice-text {\r
  font-size: var(--text-p-sm-regular-size);\r
  line-height: 20px;\r
  color: #5C4700;\r
}\r
\r
/* \u2500\u2500 Upload tracker spinner \u2500\u2500 */\r
@keyframes lq-spin {\r
  from { transform: rotate(0deg); }\r
  to   { transform: rotate(360deg); }\r
}\r
\r
/* \u2500\u2500 Save/copy feedback (collection-picker.js _triggerSaveFeedback) \u2500\u2500 */\r
@keyframes lq-copy-label-in {\r
  0%   { opacity: 0; transform: translateX(-50%) translateY(4px) scale(0.85); }\r
  70%  { opacity: 1; transform: translateX(-50%) translateY(-1px) scale(1.04); }\r
  100% { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }\r
}\r
\r
@keyframes lq-copy-label-out {\r
  0%   { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }\r
  100% { opacity: 0; transform: translateX(-50%) translateY(-5px) scale(0.85); }\r
}\r
\r
.lq-btn--copy-exit svg {\r
  animation: lq-check-out 0.22s ease forwards;\r
}\r
\r
@keyframes lq-check-out {\r
  0%   { opacity: 1; transform: scale(1) rotate(0deg); }\r
  100% { opacity: 0; transform: scale(0.5) rotate(10deg); }\r
}\r
\r
.lq-copy-label {\r
  position: absolute;\r
  top: calc(100% + 5px);\r
  left: 50%;\r
  transform: translateX(-50%);\r
  font-size: 10px;\r
  font-weight: 600;\r
  line-height: 1;\r
  white-space: nowrap;\r
  color: var(--font-success-base, #1a7f4b);\r
  pointer-events: none;\r
  animation: lq-copy-label-in 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) 0.08s both;\r
}\r
\r
.lq-btn--copy-exit .lq-copy-label {\r
  animation: lq-copy-label-out 0.2s ease forwards;\r
}\r
\r
/* \u2500\u2500 Inline error banner \u2014 generic, used by every modal/form that now\r
   awaits a store call (create/update/delete/share). Mirrors the existing\r
   .lq-upload-error look (collection-detail-view.css) so error styling\r
   reads the same everywhere. See showInlineError()/clearInlineError() in\r
   internal/dom-utils.ts. \u2500\u2500 */\r
.lq-inline-error {\r
  margin-top: var(--space-2xs);\r
  padding: var(--space-xs) var(--space-md);\r
  background: var(--bg-error-lightest);\r
  border: 1px solid var(--stroke-error-base);\r
  border-radius: var(--radius-md);\r
  font-size: var(--text-p-sm-regular-size);\r
  font-weight: var(--text-p-sm-regular-weight);\r
  line-height: 1.6;\r
  color: var(--font-error-base);\r
}\r
.lq-inline-error[hidden] {\r
  display: none !important;\r
}\r

// Vendored/adapted from lexiq-prototype scss/layout.scss (mobile bottom sheet).\r
// Structure adapted to match src/internal/dom-utils.js's createMobileSheetController\r
// (backdrop is now a child of .lq-mobile-sheet, not a page-level sibling).\r
\r
@media (max-width: 768px) {\r
  .lq-mobile-sheet {\r
    position: fixed;\r
    inset: 0;\r
    z-index: 300;\r
    display: flex;\r
    flex-direction: column;\r
    justify-content: flex-end;\r
    pointer-events: none;\r
\r
    &[hidden] { display: none !important; }\r
  }\r
\r
  .lq-mobile-sheet--open {\r
    pointer-events: all;\r
  }\r
\r
  .lq-mobile-sheet__backdrop {\r
    position: absolute;\r
    inset: 0;\r
    background: rgba(0, 0, 0, 0.2);\r
    opacity: 0;\r
    transition: opacity 0.35s ease;\r
\r
    .lq-mobile-sheet--open & { opacity: 1; }\r
  }\r
\r
  .lq-mobile-sheet__panel {\r
    position: relative;\r
    background: var(--bg-neutral-white);\r
    border-radius: 24px 24px 0 0;\r
    min-height: 60vh;\r
    max-height: 80vh;\r
    display: flex;\r
    flex-direction: column;\r
    overflow: hidden;\r
    box-shadow: 0 -4px 6px -2px rgba(45, 57, 58, 0.05), 0 -10px 15px -3px rgba(45, 57, 58, 0.10);\r
    transform: translateY(100%);\r
    transition: transform 0.35s cubic-bezier(0.32, 0.72, 0, 1);\r
\r
    .lq-mobile-sheet--open & { transform: translateY(0); }\r
  }\r
\r
  @media (max-height: 700px) {\r
    .lq-mobile-sheet__panel {\r
      min-height: 80vh;\r
      max-height: 95vh;\r
    }\r
  }\r
\r
  .lq-mobile-sheet__handle {\r
    width: 77px;\r
    height: 8px;\r
    background: var(--stroke-primary-lighter);\r
    border-radius: 12px;\r
    margin: var(--space-md) auto var(--space-2xs);\r
    flex-shrink: 0;\r
    touch-action: none;\r
  }\r
\r
  .lq-mobile-sheet__header {\r
    display: flex;\r
    align-items: center;\r
    gap: var(--space-xs);\r
    padding: 0 var(--space-xs) var(--space-2xs);\r
    flex-shrink: 0;\r
  }\r
\r
  .lq-mobile-sheet__title {\r
    flex: 1;\r
    font-size: var(--text-p-sm-medium-size);\r
    line-height: var(--text-p-sm-medium-line-height);\r
    font-weight: 600;\r
    color: var(--font-primary-muted);\r
    text-transform: uppercase;\r
    letter-spacing: 0.5px;\r
    padding-left: var(--space-xs);\r
  }\r
\r
  .lq-mobile-sheet__body {\r
    flex: 1;\r
    overflow-y: auto;\r
    min-height: 0;\r
  }\r
}\r

/* \u2500\u2500 Collection card \u2014 floating popover anchored below the save button \u2500\u2500 */\r
.lq-collection-card {\r
  position: absolute;\r
  right: var(--space-md);\r
  width: min(90%, 300px);\r
  z-index: 20;\r
  background: var(--bg-neutral-white, #fff);\r
  border-radius: var(--radius-xl);\r
  border: 1px solid var(--stroke-neutral-white, #f2f2f3);\r
  box-shadow: 0 8px 32px rgba(24, 32, 33, 0.18);\r
  display: flex;\r
  flex-direction: column;\r
  height: 300px;\r
  overflow: hidden;\r
  opacity: 0;\r
  transform: translateY(-6px) scale(0.98);\r
  transform-origin: top right;\r
  transition: opacity 0.15s ease, transform 0.15s ease;\r
  pointer-events: none;\r
}\r
.lq-collection-card--open {\r
  opacity: 1;\r
  transform: translateY(0) scale(1);\r
  pointer-events: all;\r
}\r
\r
.lq-collection-card__header {\r
  display: flex;\r
  align-items: center;\r
  gap: var(--space-2xs);\r
  padding: var(--space-xs) var(--space-xs) var(--space-xs) var(--space-md);\r
}\r
\r
.lq-collection-card__saved-label {\r
  font-size: var(--text-p-base-regular-size);\r
  line-height: var(--text-p-base-regular-line-height);\r
  font-weight: var(--text-p-base-regular-weight);\r
  color: var(--font-neutral-black, #182021);\r
  flex: 1;\r
}\r
.lq-collection-card__saved-label strong {\r
  font-weight: 600;\r
}\r
\r
.lq-collection-card__body {\r
  border-top: 1px solid var(--stroke-neutral-white, #f2f2f3);\r
  padding-top: var(--space-xs);\r
  display: flex;\r
  flex-direction: column;\r
  flex: 1;\r
  min-height: 0;\r
  overflow: hidden;\r
}\r
\r
.lq-collection-card__section-head {\r
  display: flex;\r
  align-items: center;\r
  gap: var(--space-2xs);\r
  padding: 0 var(--space-xs) var(--space-3xs) var(--space-md);\r
  flex-shrink: 0;\r
}\r
.lq-collection-card__section-head[hidden] {\r
  display: none !important;\r
}\r
\r
.lq-collection-card__section-title {\r
  font-size: var(--text-p-base-medium-size);\r
  line-height: var(--text-p-base-medium-line-height);\r
  font-weight: var(--text-p-base-medium-weight);\r
  color: var(--font-neutral-black, #182021);\r
  flex: 1;\r
}\r
\r
.lq-collection-card__list {\r
  display: flex;\r
  flex-direction: column;\r
  padding: 0 var(--space-2xs) var(--space-2xs);\r
  overflow-y: auto;\r
  flex: 1;\r
  min-height: 0;\r
}\r
.lq-collection-card__list::-webkit-scrollbar {\r
  width: 4px;\r
}\r
.lq-collection-card__list::-webkit-scrollbar-track {\r
  background: transparent;\r
}\r
.lq-collection-card__list::-webkit-scrollbar-thumb {\r
  background: var(--bg-neutral-base, #e2e5e9);\r
  border-radius: 2px;\r
}\r
.lq-collection-card__list::-webkit-scrollbar-thumb:hover {\r
  background: var(--bg-neutral-disabled, #bec7cf);\r
}\r
\r
.lq-collection-card__item {\r
  display: flex;\r
  align-items: center;\r
  gap: var(--space-2xs);\r
  padding: var(--space-2xs) var(--space-2xs);\r
  border-radius: var(--radius-md);\r
}\r
\r
.lq-collection-card__item-icon {\r
  flex-shrink: 0;\r
  display: flex;\r
  align-items: center;\r
}\r
.lq-collection-card__item-icon svg {\r
  width: 22px;\r
  height: 22px;\r
}\r
\r
.lq-collection-card__item-name {\r
  font-size: var(--text-p-base-regular-size);\r
  line-height: var(--text-p-base-regular-line-height);\r
  font-weight: var(--text-p-base-regular-weight);\r
  color: var(--font-neutral-black, #182021);\r
  flex: 1;\r
  min-width: 0;\r
  overflow: hidden;\r
  text-overflow: ellipsis;\r
  white-space: nowrap;\r
}\r
\r
/* Mobile bottom sheet: taller rows with a bigger collection icon */\r
#mobile-sheet-body {\r
  /* Neutral reset \u2014 .lq-collection-card is normally a floating, animated\r
     popover (position/opacity/transform/fixed height); inside the sheet it\r
     should just flow as plain content, since the sheet handles its own\r
     open/close animation and scrolling. */\r
}\r
#mobile-sheet-body .lq-collection-card {\r
  position: static;\r
  width: 100%;\r
  height: auto;\r
  opacity: 1;\r
  transform: none;\r
  pointer-events: auto;\r
  box-shadow: none;\r
  border: none;\r
  border-radius: 0;\r
}\r
#mobile-sheet-body .lq-collection-card__item {\r
  padding: var(--space-2xs) var(--space-2xs);\r
}\r
#mobile-sheet-body .lq-collection-card__item-name {\r
  font-size: var(--text-h6-size);\r
  line-height: var(--text-h6-line-height);\r
  font-weight: var(--text-h6-weight);\r
}\r
#mobile-sheet-body .lq-collection-card__item-icon svg {\r
  width: 28px;\r
  height: 28px;\r
}\r
\r
@keyframes lq-collection-item-spotlight {\r
  0% {\r
    opacity: 0;\r
    transform: translateY(-6px);\r
    background-color: var(--bg-primary-lightest, #f5f8f7);\r
  }\r
  30% {\r
    opacity: 1;\r
    transform: translateY(0);\r
    background-color: var(--bg-primary-lightest, #f5f8f7);\r
  }\r
  100% {\r
    opacity: 1;\r
    transform: translateY(0);\r
    background-color: transparent;\r
  }\r
}\r
.lq-collection-card__item--new {\r
  animation: lq-collection-item-spotlight 1.5s ease forwards;\r
}\r
\r
/* \u2500\u2500 New collection inline form \u2500\u2500 */\r
.oc-input-wrap--error {\r
  border-color: var(--bg-error-base, #ad3739) !important;\r
}\r
\r
.lq-collection-card__new-wrap {\r
  display: flex;\r
  flex-direction: column;\r
  gap: var(--space-3xs);\r
  padding: var(--space-3xs) var(--space-2xs);\r
  padding-top: 0;\r
  flex-shrink: 0;\r
}\r
\r
.lq-collection-card__new-form-header {\r
  padding: 0 var(--space-3xs);\r
}\r
\r
.lq-collection-card__new-form-label {\r
  font-size: var(--text-p-sm-medium-size);\r
  line-height: var(--text-p-sm-medium-line-height);\r
  font-weight: var(--text-p-sm-medium-weight);\r
  color: var(--font-neutral-black, #182021);\r
}\r
\r
.lq-collection-card__new-form-row {\r
  display: flex;\r
  align-items: center;\r
  gap: var(--space-3xs);\r
}\r
\r
.lq-collection-card__new-field {\r
  flex: 1;\r
  min-width: 0;\r
}\r
\r
.lq-collection-card__new-semantic,\r
.lq-collection-card__error {\r
  font-size: var(--text-p-sm-regular-size);\r
  line-height: var(--text-p-sm-regular-line-height);\r
  font-weight: var(--text-p-sm-regular-weight);\r
  color: var(--font-error-base, #ad3739);\r
  margin: 0;\r
  padding: 0 var(--space-3xs);\r
}\r
.lq-collection-card__new-semantic[hidden],\r
.lq-collection-card__error[hidden] {\r
  display: none;\r
}\r
\r
.lq-collection-card__list--dimmed {\r
  opacity: 0.35;\r
  pointer-events: none;\r
}\r
\r
/* \u2500\u2500 Collection card above anchor \u2500\u2500 */\r
.lq-collection-card--above {\r
  transform-origin: bottom right;\r
}\r
.lq-collection-card--above:not(.lq-collection-card--open) {\r
  transform: translateY(6px) scale(0.98);\r
}\r

/* \u2500\u2500 Collections panel \u2500\u2500 */\r
.lq-collections-view[hidden] {\r
  display: none !important;\r
}\r
\r
.lq-col-card[hidden] {\r
  display: none !important;\r
}\r
\r
.lq-collections-view {\r
  flex: 1;\r
  display: flex;\r
  flex-direction: column;\r
  overflow: hidden;\r
  padding: var(--space-2xl) var(--space-2xl) var(--space-md);\r
}\r
\r
/* Header */\r
.lq-col-header {\r
  display: flex;\r
  align-items: center;\r
  justify-content: space-between;\r
  margin-bottom: var(--space-3xs);\r
}\r
.lq-col-header__title {\r
  font-size: var(--text-h1-size);\r
  line-height: var(--text-h1-line-height);\r
  font-weight: var(--text-h1-weight);\r
  color: var(--font-neutral-black);\r
  margin: 0;\r
}\r
.lq-col-header__actions {\r
  display: flex;\r
  align-items: center;\r
  gap: 0;\r
}\r
\r
.lq-col-subtitle {\r
  font-size: var(--text-h6-size);\r
  line-height: var(--text-h6-line-height);\r
  font-weight: var(--text-h6-weight);\r
  color: var(--font-primary-base);\r
  margin: 0 0 var(--space-xl);\r
}\r
\r
/* Hide clear button until input has a value */\r
.lq-col-sb-clear {\r
  display: none !important;\r
}\r
\r
.lq-col-sb-clear.visible {\r
  display: inline-flex !important;\r
}\r
\r
/* Tabs row */\r
.lq-col-tabs {\r
  display: flex;\r
  align-items: center;\r
  margin-bottom: var(--space-xs);\r
}\r
\r
/* Controls row */\r
.lq-col-controls {\r
  display: flex;\r
  align-items: center;\r
  gap: var(--space-2xs);\r
  margin-bottom: var(--space-xl);\r
}\r
.lq-col-controls .oc-sb {\r
  flex: 0 0 240px;\r
}\r
.lq-col-controls .oc-toggle-group {\r
  flex-shrink: 0;\r
}\r
\r
/* Grid */\r
.lq-col-grid {\r
  display: grid;\r
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));\r
  gap: var(--space-md);\r
  overflow-y: auto;\r
  align-content: start;\r
  padding-bottom: var(--space-2xl);\r
}\r
.lq-col-grid[hidden] {\r
  display: none !important;\r
}\r
\r
/* Card */\r
.lq-col-card {\r
  border-radius: var(--radius-md);\r
  border: 1px solid var(--stroke-neutral-base, #D9E2E3);\r
  background: var(--bg-neutral-white, #fff);\r
  padding: var(--space-md);\r
  display: flex;\r
  flex-direction: column;\r
  gap: 0;\r
  cursor: pointer;\r
  transition: box-shadow 0.15s ease;\r
}\r
.lq-col-card:hover {\r
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);\r
}\r
.lq-col-card:hover .lq-col-card__btn-del {\r
  opacity: 1;\r
}\r
.lq-col-card:active {\r
  box-shadow: 0 1px 4px rgba(24, 32, 33, 0.08);\r
  transform: scale(0.99);\r
  transition: box-shadow 0.08s ease, transform 0.08s ease;\r
}\r
.lq-col-card__header {\r
  display: flex;\r
  align-items: flex-start;\r
  gap: var(--space-xs);\r
  margin-bottom: var(--space-xs);\r
}\r
.lq-col-card__icon {\r
  flex-shrink: 0;\r
  width: 38px;\r
  height: 38px;\r
  display: flex;\r
  align-items: center;\r
  justify-content: center;\r
}\r
.lq-col-card__icon svg {\r
  display: block;\r
}\r
.lq-col-card__meta {\r
  flex: 1;\r
  min-width: 0;\r
  padding-top: 2px;\r
}\r
.lq-col-card__title-row {\r
  display: flex;\r
  align-items: center;\r
  gap: var(--space-3xs);\r
  min-width: 0;\r
  height: 24px;\r
  margin-bottom: 2px;\r
}\r
.lq-col-card__title {\r
  font-size: var(--text-h5-size);\r
  line-height: var(--text-h5-line-height);\r
  font-weight: var(--text-h5-weight);\r
  color: var(--font-neutral-black);\r
  margin: 0;\r
  white-space: nowrap;\r
  overflow: hidden;\r
  text-overflow: ellipsis;\r
  flex: 1;\r
  min-width: 0;\r
}\r
.lq-col-card__actions {\r
  display: flex;\r
  align-items: center;\r
  gap: 2px;\r
  flex-shrink: 0;\r
}\r
.lq-col-card__btn-del {\r
  opacity: 0;\r
  transition: opacity 120ms ease;\r
}\r
.lq-col-card__btn-del {\r
  color: var(--font-error-muted);\r
  background: transparent;\r
}\r
.lq-col-card__btn-del:hover {\r
  background: var(--bg-error-lightest);\r
  color: var(--font-error-base);\r
}\r
.lq-col-card__btn-del:active {\r
  background: var(--bg-error-base-alt);\r
  color: var(--font-error-base);\r
}\r
.lq-col-card__date {\r
  font-size: var(--text-p-sm-regular-size);\r
  line-height: var(--text-p-sm-regular-line-height);\r
  font-weight: var(--text-p-sm-regular-weight);\r
  color: var(--font-primary-base);\r
}\r
.lq-col-card__tags {\r
  display: flex;\r
  align-items: center;\r
  gap: var(--space-3xs);\r
  flex-wrap: wrap;\r
  margin-bottom: var(--space-xs);\r
  min-height: 0;\r
}\r
.lq-col-card__body {\r
  flex: 1;\r
  margin-bottom: var(--space-xs);\r
}\r
.lq-col-card__desc {\r
  font-size: var(--text-p-base-regular-size);\r
  line-height: var(--text-p-base-regular-line-height);\r
  font-weight: var(--text-p-base-regular-weight);\r
  color: var(--font-primary-base);\r
  margin: 0;\r
  display: -webkit-box;\r
  -webkit-line-clamp: 4;\r
  -webkit-box-orient: vertical;\r
  overflow: hidden;\r
}\r
.lq-col-card__sep {\r
  height: 1px;\r
  background: var(--stroke-neutral-base, #D9E2E3);\r
  margin-bottom: var(--space-xs);\r
}\r
.lq-col-card__footer {\r
  display: flex;\r
  align-items: center;\r
  justify-content: space-between;\r
  gap: var(--space-2xs);\r
}\r
.lq-col-card__count {\r
  display: flex;\r
  align-items: center;\r
  gap: 4px;\r
  flex-shrink: 0;\r
  margin-left: auto;\r
  font-size: var(--text-p-sm-regular-size);\r
  line-height: var(--text-p-sm-regular-line-height);\r
  font-weight: var(--text-p-sm-regular-weight);\r
  color: var(--font-primary-muted);\r
}\r
.lq-col-card__count svg {\r
  display: block;\r
}\r
\r
/* \u2500\u2500 Selection bar \u2500\u2500 */\r
.lq-col-selbar[hidden] {\r
  display: none !important;\r
}\r
\r
.lq-col-sel-group {\r
  flex-shrink: 0;\r
  margin-left: auto;\r
}\r
\r
.lq-col-controls:has(.lq-col-selbar:not([hidden])) .lq-col-selbar {\r
  margin-left: auto;\r
}\r
.lq-col-controls:has(.lq-col-selbar:not([hidden])) .lq-col-sel-group {\r
  margin-left: 0;\r
}\r
\r
.lq-col-selbar {\r
  display: flex;\r
  align-items: center;\r
  gap: var(--space-xs);\r
}\r
.lq-col-selbar__count {\r
  font-size: var(--text-p-base-regular-size);\r
  line-height: var(--text-p-base-regular-line-height);\r
  font-weight: var(--text-p-base-regular-weight);\r
  color: var(--font-primary-base);\r
}\r
\r
/* \u2500\u2500 Selection mode \u2500\u2500 */\r
.lq-col-card__checkbox {\r
  display: none !important;\r
}\r
\r
.lq-col-grid--selecting .lq-col-card {\r
  cursor: pointer;\r
}\r
.lq-col-grid--selecting .lq-col-card .lq-col-card__btn-del {\r
  display: none !important;\r
}\r
.lq-col-grid--selecting .lq-col-card .lq-col-card__checkbox {\r
  display: inline-flex !important;\r
}\r
.lq-col-grid--selecting .lq-col-card .lq-col-card__actions {\r
  opacity: 1;\r
}\r
.lq-col-grid--selecting .lq-col-card--selected {\r
  border-color: var(--stroke-primary-base);\r
  background: var(--bg-primary-lightest);\r
}\r
/* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\r
   LIST VIEW\r
\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\r
/* Shared column layout \u2014 base is 6 cols (no checkbox); select adds the 28px checkbox col */\r
:host {\r
  --col-template: minmax(220px, 1fr) 90px 120px 148px minmax(80px, 160px) 64px;\r
  --col-template-select: 28px minmax(220px, 1fr) 90px 120px 148px minmax(80px, 160px) 64px;\r
}\r
\r
/* \u2500\u2500 Container \u2500\u2500 */\r
.lq-col-list {\r
  display: flex;\r
  flex-direction: column;\r
  overflow-y: auto;\r
  gap: var(--space-xs);\r
  padding: 0 var(--space-2xs) var(--space-2xl);\r
}\r
.lq-col-list[hidden] {\r
  display: none !important;\r
}\r
\r
/* \u2500\u2500 Header row \u2500\u2500 */\r
.lq-col-list-header {\r
  display: grid;\r
  grid-template-columns: var(--col-template);\r
  align-items: center;\r
  column-gap: var(--space-md);\r
  padding: var(--space-2xs) var(--space-xs);\r
  position: sticky;\r
  top: 0;\r
  z-index: 2;\r
  background: var(--color-bg-main);\r
  flex-shrink: 0;\r
}\r
\r
.lq-col-list__hdr-cell {\r
  font-size: var(--text-p-sm-medium-size);\r
  line-height: var(--text-p-sm-medium-line-height);\r
  font-weight: var(--text-p-sm-medium-weight);\r
  color: var(--font-primary-muted);\r
  display: flex;\r
  align-items: center;\r
  gap: 4px;\r
  white-space: nowrap;\r
}\r
\r
/* Checkbox header cell: hidden until selection mode */\r
.lq-col-list__hdr-cb {\r
  display: none;\r
}\r
\r
/* Select-all checkbox: hidden until selection mode */\r
.lq-col-list__select-all {\r
  display: none !important;\r
}\r
\r
.lq-col-list--selecting .lq-col-list__select-all {\r
  display: inline-flex !important;\r
}\r
\r
/* \u2500\u2500 Data row \u2500\u2500 */\r
.lq-col-row {\r
  display: grid;\r
  grid-template-columns: var(--col-template);\r
  align-items: center;\r
  column-gap: var(--space-md);\r
  padding: var(--space-xs) var(--space-xs);\r
  border-radius: var(--radius-md);\r
  border: 1px solid var(--stroke-neutral-base, #D9E2E3);\r
  background: var(--bg-neutral-white);\r
  cursor: pointer;\r
  transition: box-shadow 0.15s ease, border-color 0.15s ease;\r
}\r
.lq-col-row:hover {\r
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);\r
}\r
.lq-col-row:hover .lq-col-row__btn-del {\r
  opacity: 1;\r
}\r
.lq-col-row:active {\r
  box-shadow: 0 1px 4px rgba(24, 32, 33, 0.08);\r
  transform: scale(0.99);\r
  transition: box-shadow 0.08s ease, transform 0.08s ease;\r
}\r
.lq-col-row--selected {\r
  border-color: var(--stroke-primary-base);\r
  background: var(--bg-primary-lightest);\r
}\r
.lq-col-row[hidden] {\r
  display: none !important;\r
}\r
\r
/* \u2500\u2500 Checkbox cell: hidden until selection mode \u2500\u2500 */\r
.lq-col-row__cb {\r
  display: none;\r
  align-items: center;\r
  justify-content: center;\r
}\r
\r
.lq-col-row__checkbox {\r
  display: none !important;\r
}\r
\r
.lq-col-list--selecting .lq-col-list-header {\r
  grid-template-columns: var(--col-template-select);\r
}\r
.lq-col-list--selecting .lq-col-list__hdr-cb {\r
  display: flex;\r
  align-items: center;\r
  justify-content: center;\r
}\r
.lq-col-list--selecting .lq-col-row {\r
  grid-template-columns: var(--col-template-select);\r
}\r
.lq-col-list--selecting .lq-col-row .lq-col-row__btn-del {\r
  display: none !important;\r
}\r
.lq-col-list--selecting .lq-col-row .lq-col-row__checkbox {\r
  display: inline-flex !important;\r
}\r
.lq-col-list--selecting .lq-col-row .lq-col-row__actions {\r
  opacity: 1;\r
}\r
.lq-col-list--selecting .lq-col-row__cb {\r
  display: flex;\r
  animation: lq-cb-appear 180ms ease both;\r
}\r
\r
@keyframes lq-cb-appear {\r
  from {\r
    opacity: 0;\r
    transform: scale(0.75);\r
  }\r
  to {\r
    opacity: 1;\r
    transform: scale(1);\r
  }\r
}\r
/* \u2500\u2500 Name cell \u2500\u2500 */\r
.lq-col-row__name {\r
  display: flex;\r
  align-items: center;\r
  gap: var(--space-xs);\r
  min-width: 0;\r
  overflow: hidden;\r
}\r
\r
.lq-col-row__icon {\r
  flex-shrink: 0;\r
  width: 32px;\r
  height: 32px;\r
  display: flex;\r
  align-items: center;\r
  justify-content: center;\r
}\r
.lq-col-row__icon svg {\r
  display: block;\r
}\r
\r
.lq-col-row__name-block {\r
  display: flex;\r
  flex-direction: column;\r
  gap: 1px;\r
  min-width: 0;\r
  flex: 1;\r
}\r
\r
.lq-col-row__title {\r
  font-size: var(--text-p-base-medium-size);\r
  line-height: var(--text-p-base-medium-line-height);\r
  font-weight: var(--text-p-base-medium-weight);\r
  color: var(--font-neutral-black);\r
  white-space: nowrap;\r
  overflow: hidden;\r
  text-overflow: ellipsis;\r
}\r
\r
.lq-col-row__desc {\r
  font-size: var(--text-p-sm-regular-size);\r
  line-height: var(--text-p-sm-regular-line-height);\r
  font-weight: var(--text-p-sm-regular-weight);\r
  color: var(--font-primary-muted);\r
  white-space: nowrap;\r
  overflow: hidden;\r
  text-overflow: ellipsis;\r
}\r
\r
/* \u2500\u2500 Content cell \u2500\u2500 */\r
.lq-col-row__content {\r
  display: flex;\r
  align-items: center;\r
  gap: var(--space-3xs);\r
  font-size: var(--text-p-sm-regular-size);\r
  line-height: var(--text-p-sm-regular-line-height);\r
  font-weight: var(--text-p-sm-regular-weight);\r
  color: var(--font-primary-base);\r
  white-space: nowrap;\r
}\r
.lq-col-row__content svg {\r
  width: 12px;\r
  height: 12px;\r
  flex-shrink: 0;\r
  color: var(--font-primary-muted);\r
}\r
\r
/* \u2500\u2500 Owner/Shared cell \u2500\u2500 */\r
.lq-col-row__owner {\r
  display: flex;\r
  align-items: center;\r
}\r
\r
.lq-col-row__owner-dash {\r
  font-size: var(--text-p-sm-regular-size);\r
  line-height: var(--text-p-sm-regular-line-height);\r
  font-weight: var(--text-p-sm-regular-weight);\r
  color: var(--font-primary-muted);\r
}\r
\r
/* \u2500\u2500 Date cell \u2500\u2500 */\r
.lq-col-row__date {\r
  font-size: var(--text-p-sm-regular-size);\r
  line-height: var(--text-p-sm-regular-line-height);\r
  font-weight: var(--text-p-sm-regular-weight);\r
  color: var(--font-primary-base);\r
  white-space: nowrap;\r
  overflow: hidden;\r
  text-overflow: ellipsis;\r
}\r
\r
/* \u2500\u2500 Tags cell \u2500\u2500 */\r
.lq-col-row__tags {\r
  display: flex;\r
  align-items: center;\r
  gap: var(--space-3xs);\r
  overflow: hidden;\r
  flex-wrap: nowrap;\r
}\r
\r
/* \u2500\u2500 Actions cell \u2500\u2500 */\r
.lq-col-row__actions {\r
  display: flex;\r
  align-items: center;\r
  justify-content: flex-end;\r
  gap: 2px;\r
  flex-shrink: 0;\r
}\r
\r
.lq-col-row__btn-del {\r
  color: var(--font-error-muted);\r
  background: transparent;\r
  opacity: 0;\r
  transition: opacity 120ms ease;\r
}\r
.lq-col-row__btn-del:hover {\r
  background: var(--bg-error-lightest);\r
  color: var(--font-error-base);\r
}\r
.lq-col-row__btn-del:active {\r
  background: var(--bg-error-base-alt);\r
  color: var(--font-error-base);\r
}\r
\r
@media (max-width: 768px) {\r
  .lq-collections-view {\r
    padding: var(--space-xs) var(--space-xs) 0;\r
    overflow-y: auto;\r
  }\r
  .lq-col-grid,\r
  .lq-col-list {\r
    overflow-y: visible;\r
  }\r
  .lq-col-controls {\r
    flex-wrap: wrap;\r
  }\r
  .lq-col-controls .oc-sb {\r
    flex: 1 1 0;\r
    min-width: 0;\r
  }\r
  .lq-col-list-header,\r
  .lq-col-row {\r
    grid-template-columns: minmax(0, 1fr) auto 80px;\r
  }\r
  .lq-col-list--selecting .lq-col-list-header,\r
  .lq-col-list--selecting .lq-col-row {\r
    grid-template-columns: 28px minmax(0, 1fr) auto 80px;\r
  }\r
  .lq-col-row__icon,\r
  .lq-col-row__content,\r
  .lq-col-row__date,\r
  .lq-col-row__tags {\r
    display: none !important;\r
  }\r
  .lq-col-row__actions {\r
    gap: var(--space-3xs);\r
  }\r
  .lq-col-row__btn-del {\r
    opacity: 1 !important;\r
    width: var(--row-height-md) !important;\r
    height: var(--row-height-md) !important;\r
    border-radius: 50% !important;\r
  }\r
  .lq-col-list__hdr-content,\r
  .lq-col-list__hdr-date,\r
  .lq-col-list__hdr-tags {\r
    display: none !important;\r
  }\r
  .lq-col-selbar:not([hidden]) {\r
    flex-basis: 100%;\r
    flex-wrap: wrap;\r
    margin-left: 0;\r
    order: 2;\r
  }\r
  .lq-col-sel-group {\r
    order: 1;\r
    margin-left: auto;\r
  }\r
  .lq-col-tabs__scroll {\r
    overflow-x: auto;\r
    scrollbar-width: none;\r
  }\r
  .lq-col-tabs__scroll::-webkit-scrollbar {\r
    display: none;\r
  }\r
  .lq-col-tabs__scroll .oc-tab-group {\r
    min-width: max-content;\r
  }\r
  .lq-col-card__btn-del {\r
    opacity: 1 !important;\r
    width: 36px !important;\r
    height: 36px !important;\r
    border-radius: 50% !important;\r
  }\r
  .lq-col-card__btn-del svg,\r
  .lq-col-card__btn-del i {\r
    width: 14px !important;\r
    height: 14px !important;\r
  }\r
  .lq-col-header {\r
    flex-direction: column;\r
    align-items: stretch;\r
    gap: var(--space-xs);\r
    margin-bottom: var(--space-3xs);\r
  }\r
  .lq-col-header__title {\r
    order: 2;\r
  }\r
  .lq-col-header__actions {\r
    order: 1;\r
    justify-content: space-between;\r
  }\r
}\r
\r
/* \u2500\u2500 Loading / error states for the initial GET .../container fetch \u2014\r
   mirrors .lq-cdv-empty's centered layout (collection-detail-view.css). \u2500\u2500 */\r
.lq-col-loading {\r
  display: flex;\r
  flex-direction: column;\r
  align-items: center;\r
  justify-content: center;\r
  gap: var(--space-xs);\r
  padding: var(--space-2xl) var(--space-md);\r
  text-align: center;\r
  font-size: var(--text-p-base-regular-size);\r
  line-height: var(--text-p-base-regular-line-height);\r
  font-weight: var(--text-p-base-regular-weight);\r
  color: var(--font-primary-base);\r
}\r
.lq-col-loading[hidden] {\r
  display: none !important;\r
}\r
.lq-col-loading--error {\r
  color: var(--font-error-base);\r
}\r

/* \u2500\u2500 Collection detail view \u2500\u2500 */\r
.lq-col-detail-view[hidden] {\r
  display: none !important;\r
}\r
\r
.lq-col-detail-view {\r
  flex: 1;\r
  display: flex;\r
  flex-direction: column;\r
  overflow: hidden;\r
  padding: var(--space-2xl) var(--space-2xl) var(--space-md);\r
}\r
\r
/* Header */\r
.lq-cdv-header {\r
  display: flex;\r
  align-items: center;\r
  gap: var(--space-xs);\r
  margin-bottom: var(--space-xs);\r
}\r
\r
.lq-cdv-title {\r
  font-size: var(--text-h1-size);\r
  line-height: var(--text-h1-line-height);\r
  font-weight: var(--text-h1-weight);\r
  color: var(--font-neutral-black);\r
  margin: 0;\r
  flex: 1;\r
  min-width: 0;\r
  white-space: nowrap;\r
  overflow: hidden;\r
  text-overflow: ellipsis;\r
}\r
\r
/* Mobile-only "more" button \u2014 hidden on desktop where the actions are spelled out */\r
#cdv-more-btn {\r
  display: none;\r
}\r
\r
.lq-cdv-actions {\r
  display: flex;\r
  align-items: center;\r
  gap: var(--space-2xs);\r
  flex-shrink: 0;\r
}\r
\r
/* Description */\r
.lq-cdv-desc {\r
  font-size: var(--text-h6-size);\r
  line-height: var(--text-h6-line-height);\r
  font-weight: var(--text-h6-weight);\r
  color: var(--font-primary-base);\r
  margin: 0 0 var(--space-xs);\r
}\r
\r
/* Tags */\r
.lq-cdv-tags {\r
  font-size: var(--text-p-base-regular-size);\r
  line-height: var(--text-p-base-regular-line-height);\r
  font-weight: var(--text-p-base-regular-weight);\r
  color: var(--font-primary-base);\r
  margin: 0 0 var(--space-xl);\r
  display: flex;\r
  align-items: center;\r
  gap: var(--space-2xs);\r
}\r
\r
.lq-cdv-tags svg {\r
  flex-shrink: 0;\r
  display: block;\r
}\r
\r
.lq-cdv-tags[hidden] {\r
  display: none !important;\r
}\r
\r
/* Controls row \u2014 reuses lq-col-controls from collections */\r
.lq-cdv-controls {\r
  margin-bottom: var(--space-xs);\r
}\r
\r
/* Transparent wrapper: its children flow as normal flex items of\r
   .lq-cdv-controls. Exists only so the markup can separate Upload (which\r
   floats to the top on mobile) from the rest of the controls row. */\r
.lq-cdv-controls-rest {\r
  display: contents;\r
}\r
\r
/* Explicit order restores the desktop sequence (toggle, search, upload, selbar, select)\r
   now that Upload sits outside .lq-cdv-controls-rest in the markup. */\r
.lq-cdv-controls .oc-toggle-group {\r
  order: 1;\r
}\r
.lq-cdv-controls .oc-sb {\r
  order: 2;\r
}\r
.lq-cdv-controls .lq-cdv-selbar {\r
  order: 4;\r
}\r
\r
#col-detail-upload {\r
  order: 3;\r
}\r
\r
#col-detail-select-btn {\r
  order: 5;\r
}\r
\r
/* File count */\r
.lq-cdv-count {\r
  font-size: var(--text-p-base-regular-size);\r
  line-height: var(--text-p-base-regular-line-height);\r
  font-weight: var(--text-p-base-regular-weight);\r
  color: var(--font-primary-base);\r
  margin: 0 0 var(--space-xs);\r
}\r
\r
/* Empty state */\r
.lq-cdv-empty[hidden] {\r
  display: none !important;\r
}\r
\r
.lq-cdv-empty {\r
  flex: 1;\r
  display: flex;\r
  flex-direction: column;\r
  align-items: center;\r
  justify-content: center;\r
  text-align: center;\r
  gap: var(--space-xs);\r
  padding: var(--space-2xl);\r
}\r
\r
.lq-cdv-empty__icon {\r
  display: flex;\r
  align-items: center;\r
  justify-content: center;\r
  margin-bottom: var(--space-xs);\r
}\r
.lq-cdv-empty__icon svg {\r
  display: block;\r
  width: 56px;\r
  height: 56px;\r
}\r
\r
.lq-cdv-empty__title {\r
  font-size: var(--text-h5-size);\r
  line-height: var(--text-h5-line-height);\r
  font-weight: var(--text-h5-weight);\r
  color: var(--font-primary-dark);\r
  margin: 0;\r
}\r
\r
.lq-cdv-empty__sub {\r
  font-size: var(--text-p-base-regular-size);\r
  line-height: var(--text-p-base-regular-line-height);\r
  font-weight: var(--text-p-base-regular-weight);\r
  color: var(--font-primary-base);\r
  margin: 0;\r
  max-width: 280px;\r
}\r
\r
/* Document grid */\r
.lq-cdv-grid[hidden] {\r
  display: none !important;\r
}\r
\r
.lq-cdv-grid {\r
  display: grid;\r
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));\r
  gap: var(--space-md);\r
  overflow-y: auto;\r
  align-content: start;\r
  padding-bottom: var(--space-2xl);\r
}\r
\r
/* Selbar */\r
.lq-cdv-selbar[hidden] {\r
  display: none !important;\r
}\r
\r
.lq-cdv-selbar {\r
  display: flex;\r
  align-items: center;\r
  gap: var(--space-xs);\r
}\r
\r
.lq-cdv-controls:has(.lq-cdv-selbar:not([hidden])) .lq-cdv-selbar {\r
  margin-left: auto;\r
}\r
.lq-cdv-controls:has(.lq-cdv-selbar:not([hidden])) .lq-col-sel-group {\r
  margin-left: 0;\r
}\r
\r
/* Document card */\r
.lq-doc-card__checkbox {\r
  display: none !important;\r
}\r
\r
.lq-cdv-grid--selecting .lq-doc-card .lq-doc-card__checkbox {\r
  display: inline-flex !important;\r
  animation: lq-cb-appear 180ms ease both;\r
}\r
.lq-cdv-grid--selecting .lq-doc-card--selected {\r
  border-color: var(--stroke-primary-base);\r
  background: var(--bg-primary-lightest);\r
}\r
\r
.lq-doc-card {\r
  position: relative;\r
  border-radius: var(--radius-md);\r
  border: 1px solid var(--stroke-neutral-base, #D9E2E3);\r
  background: var(--bg-neutral-white);\r
  padding: var(--space-md);\r
  display: flex;\r
  flex-direction: column;\r
  cursor: pointer;\r
  transition: box-shadow 0.15s ease;\r
}\r
.lq-doc-card:hover {\r
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);\r
}\r
.lq-doc-card:active {\r
  box-shadow: 0 1px 4px rgba(24, 32, 33, 0.08);\r
  transform: scale(0.99);\r
  transition: box-shadow 0.08s ease, transform 0.08s ease;\r
}\r
\r
.lq-doc-card__icon {\r
  width: 36px;\r
  height: 36px;\r
  display: flex;\r
  align-items: center;\r
  justify-content: center;\r
  margin-bottom: var(--space-xs);\r
}\r
.lq-doc-card__icon svg {\r
  display: block;\r
}\r
\r
.lq-doc-card__name {\r
  font-size: var(--text-p-base-medium-size);\r
  line-height: var(--text-p-base-medium-line-height);\r
  font-weight: var(--text-p-base-medium-weight);\r
  color: var(--font-neutral-black);\r
  margin-bottom: var(--space-2xs);\r
  white-space: nowrap;\r
  overflow: hidden;\r
  text-overflow: ellipsis;\r
}\r
\r
.lq-doc-card__size {\r
  font-size: var(--text-p-sm-regular-size);\r
  line-height: var(--text-p-sm-regular-line-height);\r
  font-weight: var(--text-p-sm-regular-weight);\r
  color: var(--font-primary-muted);\r
}\r
\r
.lq-doc-card__sep {\r
  height: 1px;\r
  background: var(--stroke-neutral-base, #D9E2E3);\r
  margin: var(--space-xs) 0;\r
}\r
\r
.lq-doc-card__footer {\r
  display: flex;\r
  align-items: center;\r
  justify-content: space-between;\r
  gap: var(--space-2xs);\r
}\r
\r
.lq-doc-card__date {\r
  font-size: var(--text-p-sm-regular-size);\r
  line-height: var(--text-p-sm-regular-line-height);\r
  font-weight: var(--text-p-sm-regular-weight);\r
  color: var(--font-primary-muted);\r
  white-space: nowrap;\r
  flex-shrink: 0;\r
  margin-left: auto;\r
}\r
\r
.lq-doc-card__checkbox {\r
  position: absolute;\r
  top: var(--space-xs);\r
  right: var(--space-xs);\r
}\r
\r
/* Delete button (was the "more" menu opener, hence the shared geometry) */\r
.lq-doc-card__btn-del {\r
  position: absolute;\r
  top: var(--space-xs);\r
  right: var(--space-xs);\r
  opacity: 0;\r
  transition: opacity 0.15s ease;\r
  color: var(--font-error-muted);\r
  background: transparent;\r
}\r
.lq-doc-card__btn-del:hover {\r
  background: var(--bg-error-lightest);\r
  color: var(--font-error-base);\r
}\r
.lq-doc-card__btn-del:active {\r
  background: var(--bg-error-base-alt);\r
  color: var(--font-error-base);\r
}\r
\r
.lq-doc-card:hover .lq-doc-card__btn-del {\r
  opacity: 1;\r
}\r
\r
.lq-cdv-grid--selecting .lq-doc-card__btn-del {\r
  display: none !important;\r
}\r
\r
/* Bubble-out removal animation */\r
@keyframes lq-doc-bubble-out {\r
  0% {\r
    transform: scale(1);\r
    opacity: 1;\r
  }\r
  35% {\r
    transform: scale(1.06);\r
    opacity: 0.9;\r
  }\r
  100% {\r
    transform: scale(0.85);\r
    opacity: 0;\r
  }\r
}\r
.lq-doc-card--bubble-out {\r
  animation: lq-doc-bubble-out 350ms cubic-bezier(0.4, 0, 0.8, 0.6) forwards;\r
  pointer-events: none;\r
}\r
\r
/* Document list view */\r
:host {\r
  --doc-col-template: 1fr 160px 72px 140px 36px;\r
  --doc-col-template-select: 36px 1fr 160px 72px 140px 36px;\r
}\r
\r
.lq-doc-list {\r
  display: flex;\r
  flex-direction: column;\r
  overflow-y: auto;\r
  gap: var(--space-xs);\r
  padding-bottom: var(--space-2xl);\r
}\r
.lq-doc-list[hidden] {\r
  display: none !important;\r
}\r
\r
.lq-doc-list-header {\r
  display: grid;\r
  grid-template-columns: var(--doc-col-template);\r
  align-items: center;\r
  column-gap: var(--space-md);\r
  padding: var(--space-2xs) var(--space-xs);\r
  position: sticky;\r
  top: 0;\r
  z-index: 2;\r
  background: var(--color-bg-main);\r
  flex-shrink: 0;\r
}\r
\r
.lq-doc-list__hdr-cell {\r
  font-size: var(--text-p-sm-medium-size);\r
  line-height: var(--text-p-sm-medium-line-height);\r
  font-weight: var(--text-p-sm-medium-weight);\r
  color: var(--font-primary-muted);\r
  white-space: nowrap;\r
}\r
\r
.lq-doc-list__hdr-cb {\r
  display: none;\r
}\r
\r
.lq-doc-list__select-all {\r
  display: none !important;\r
}\r
\r
.lq-cdv-list--selecting .lq-doc-list__select-all {\r
  display: inline-flex !important;\r
}\r
\r
.lq-doc-row {\r
  display: grid;\r
  grid-template-columns: var(--doc-col-template);\r
  align-items: center;\r
  column-gap: var(--space-md);\r
  padding: var(--space-xs);\r
  border-radius: var(--radius-md);\r
  border: 1px solid var(--stroke-neutral-base, #D9E2E3);\r
  background: var(--bg-neutral-white);\r
  cursor: pointer;\r
  transition: box-shadow 0.15s ease, border-color 0.15s ease;\r
}\r
.lq-doc-row:hover {\r
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);\r
}\r
.lq-doc-row:active {\r
  box-shadow: 0 1px 4px rgba(24, 32, 33, 0.08);\r
  transform: scale(0.99);\r
  transition: box-shadow 0.08s ease, transform 0.08s ease;\r
}\r
\r
.lq-doc-row__cb {\r
  display: none;\r
  align-items: center;\r
  justify-content: center;\r
}\r
\r
.lq-doc-row__name {\r
  display: flex;\r
  align-items: center;\r
  gap: var(--space-xs);\r
  min-width: 0;\r
  overflow: hidden;\r
}\r
\r
.lq-doc-row__icon {\r
  flex-shrink: 0;\r
  width: 32px;\r
  height: 32px;\r
  display: flex;\r
  align-items: center;\r
  justify-content: center;\r
}\r
.lq-doc-row__icon svg {\r
  display: block;\r
}\r
\r
.lq-doc-row__source {\r
  display: flex;\r
  align-items: center;\r
  overflow: hidden;\r
}\r
\r
.lq-doc-row__size {\r
  font-size: var(--text-p-sm-regular-size);\r
  line-height: var(--text-p-sm-regular-line-height);\r
  font-weight: var(--text-p-sm-regular-weight);\r
  color: var(--font-primary-muted);\r
  white-space: nowrap;\r
}\r
\r
.lq-doc-row__date {\r
  font-size: var(--text-p-sm-regular-size);\r
  line-height: var(--text-p-sm-regular-line-height);\r
  font-weight: var(--text-p-sm-regular-weight);\r
  color: var(--font-primary-base);\r
  white-space: nowrap;\r
  overflow: hidden;\r
  text-overflow: ellipsis;\r
}\r
\r
.lq-doc-row__actions {\r
  display: flex;\r
  align-items: center;\r
  justify-content: flex-end;\r
}\r
\r
/* Override absolute positioning from card context */\r
.lq-doc-row .lq-doc-card__btn-del {\r
  position: static;\r
}\r
\r
.lq-doc-row:hover .lq-doc-card__btn-del {\r
  opacity: 1;\r
}\r
\r
/* List selection mode */\r
.lq-cdv-list--selecting .lq-doc-list-header {\r
  grid-template-columns: var(--doc-col-template-select);\r
}\r
.lq-cdv-list--selecting .lq-doc-list__hdr-cb {\r
  display: flex;\r
  align-items: center;\r
  justify-content: center;\r
}\r
.lq-cdv-list--selecting .lq-doc-row {\r
  grid-template-columns: var(--doc-col-template-select);\r
}\r
.lq-cdv-list--selecting .lq-doc-row .lq-doc-card__btn-del {\r
  display: none !important;\r
}\r
.lq-cdv-list--selecting .lq-doc-row__cb {\r
  display: flex;\r
  animation: lq-cb-appear 180ms ease both;\r
}\r
\r
.lq-doc-row.lq-doc-card--selected {\r
  border-color: var(--stroke-primary-base);\r
  background: var(--bg-primary-lightest);\r
}\r
\r
/* \u2500\u2500 Share collection modal \u2500\u2500 */\r
.lq-col-share-modal {\r
  width: 520px;\r
  overflow: visible; /* allow perm dropdown to escape without being clipped */\r
}\r
\r
.lq-col-share-body {\r
  display: flex;\r
  flex-direction: column;\r
  gap: var(--space-md);\r
}\r
\r
.lq-col-share-search-wrap {\r
  display: flex;\r
  align-items: flex-start;\r
  gap: var(--space-xs);\r
}\r
\r
.lq-col-share-input-anchor {\r
  position: relative;\r
  flex: 1;\r
  min-width: 0;\r
}\r
\r
.lq-col-share-dropdown {\r
  position: absolute;\r
  top: calc(100% + 4px);\r
  left: 0;\r
  right: 0;\r
  z-index: 10;\r
  background: var(--bg-neutral-white);\r
  border: 1px solid var(--stroke-neutral-base);\r
  border-radius: var(--radius-md);\r
  box-shadow: 0 4px 6px -2px rgba(45, 57, 58, 0.05), 0 10px 15px -3px rgba(45, 57, 58, 0.1);\r
  max-height: 220px;\r
  overflow-y: auto;\r
  display: flex;\r
  flex-direction: column;\r
  padding: var(--space-2xs);\r
  gap: var(--space-3xs);\r
}\r
.lq-col-share-dropdown[hidden] {\r
  display: none !important;\r
}\r
\r
.lq-col-share-option {\r
  display: flex;\r
  align-items: center;\r
  gap: var(--space-xs);\r
  padding: var(--space-xs);\r
  border-radius: var(--radius-sm);\r
  cursor: pointer;\r
}\r
.lq-col-share-option:hover {\r
  background: var(--bg-primary-lightest);\r
}\r
\r
.lq-col-share-option__info {\r
  display: flex;\r
  flex-direction: column;\r
  min-width: 0;\r
}\r
\r
.lq-col-share-option__name {\r
  font-size: var(--text-p-base-medium-size);\r
  line-height: var(--text-p-base-medium-line-height);\r
  font-weight: var(--text-p-base-medium-weight);\r
  color: var(--font-neutral-black);\r
  white-space: nowrap;\r
  overflow: hidden;\r
  text-overflow: ellipsis;\r
}\r
\r
.lq-col-share-option__email {\r
  font-size: var(--text-p-sm-regular-size);\r
  line-height: var(--text-p-sm-regular-line-height);\r
  font-weight: var(--text-p-sm-regular-weight);\r
  color: var(--font-primary-muted);\r
  white-space: nowrap;\r
  overflow: hidden;\r
  text-overflow: ellipsis;\r
}\r
\r
/* Permission button wrapper \u2014 positions the dropdown relative to the button */\r
.lq-col-share-perm-wrap {\r
  position: relative;\r
  flex-shrink: 0;\r
  margin-left: auto;\r
}\r
\r
/* Permission button pressed state when dropdown is open */\r
.lq-col-share-perm-btn[aria-expanded=true] {\r
  background: var(--bg-secondary-light) !important;\r
  color: var(--font-secondary-pressed) !important;\r
}\r
\r
/* Permission dropdown \u2014 matches lq-agent-menu style */\r
.lq-col-share-perm-dropdown {\r
  position: absolute;\r
  top: calc(100% + 4px);\r
  right: 0;\r
  z-index: 500;\r
  width: 260px;\r
  background: var(--bg-neutral-white);\r
  border: 1px solid var(--stroke-neutral-white);\r
  border-radius: var(--radius-lg);\r
  box-shadow: 0 4px 6px -2px rgba(45, 57, 58, 0.05), 0 10px 15px -3px rgba(45, 57, 58, 0.1);\r
  display: flex;\r
  flex-direction: column;\r
  padding: var(--space-2xs);\r
  gap: var(--space-3xs);\r
}\r
.lq-col-share-perm-dropdown[hidden] {\r
  display: none !important;\r
}\r
.lq-col-share-perm-dropdown .oc-list-item {\r
  height: auto;\r
  padding: var(--space-xs);\r
  align-items: flex-start;\r
}\r
.lq-col-share-perm-dropdown .oc-list-item-subtext {\r
  white-space: normal;\r
  overflow: visible;\r
  text-overflow: clip;\r
}\r
\r
/* \u2500\u2500 Edit collection modal \u2500\u2500 */\r
.lq-col-edit-modal {\r
  width: 520px;\r
}\r
\r
.lq-col-edit-body {\r
  display: flex;\r
  flex-direction: column;\r
  gap: var(--space-md);\r
}\r
\r
.lq-col-edit-desc-wrap {\r
  flex-direction: column;\r
  align-items: stretch;\r
}\r
\r
.lq-col-edit-desc-wrap .oc-input-counter {\r
  font-size: var(--text-p-sm-regular-size);\r
  line-height: var(--text-p-sm-regular-line-height);\r
  font-weight: var(--text-p-sm-regular-weight);\r
  align-self: flex-end;\r
  margin-top: var(--space-3xs);\r
}\r
\r
/* Tag input */\r
.lq-tag-input {\r
  display: flex;\r
  flex-wrap: wrap;\r
  align-items: center;\r
  gap: var(--space-2xs);\r
  border: 1px solid var(--stroke-primary-light);\r
  background: var(--bg-neutral-white);\r
  border-radius: var(--radius-sm);\r
  padding: var(--space-xs) var(--space-md);\r
  min-height: 36px;\r
  cursor: text;\r
  box-sizing: border-box;\r
  width: 100%;\r
  transition: border-color 0.15s ease, background-color 0.15s ease;\r
}\r
.lq-tag-input:hover:not(:focus-within) {\r
  border-color: var(--stroke-primary-hovered);\r
  background-color: var(--bg-primary-lighter);\r
}\r
.lq-tag-input:focus-within {\r
  border: 2px solid var(--stroke-primary-pressed);\r
  padding: calc(var(--space-xs) - 1px) calc(var(--space-md) - 1px);\r
}\r
\r
.lq-tag-input__chip {\r
  flex-shrink: 0;\r
}\r
\r
.lq-tag-input__input {\r
  flex: 1;\r
  min-width: 80px;\r
  border: none;\r
  background: transparent;\r
  font-family: "Hanken Grotesk", sans-serif;\r
  font-size: var(--text-p-base-regular-size);\r
  color: var(--font-primary-base);\r
  line-height: 1.4;\r
  padding: 0;\r
  outline: none;\r
}\r
.lq-tag-input__input::placeholder {\r
  color: var(--font-primary-muted);\r
}\r
\r
.lq-tag-input__remove {\r
  display: inline-flex;\r
  align-items: center;\r
  justify-content: center;\r
  background: none;\r
  border: none;\r
  padding: 0 0 0 2px;\r
  cursor: pointer;\r
  color: inherit;\r
  line-height: 1;\r
  opacity: 0.6;\r
}\r
.lq-tag-input__remove svg {\r
  display: block;\r
  width: 10px;\r
  height: 10px;\r
}\r
.lq-tag-input__remove:hover {\r
  opacity: 1;\r
}\r
\r
/* Doc card context menu */\r
.lq-doc-menu[hidden] {\r
  display: none !important;\r
}\r
\r
.lq-doc-menu {\r
  position: fixed;\r
  z-index: 300;\r
  border-radius: var(--radius-lg);\r
  border: 1px solid var(--stroke-neutral-white);\r
  background: var(--bg-neutral-white);\r
  box-shadow: 0 4px 6px -2px rgba(45, 57, 58, 0.05), 0 10px 15px -3px rgba(45, 57, 58, 0.1);\r
  display: flex;\r
  flex-direction: column;\r
  gap: var(--space-3xs);\r
  padding: var(--space-2xs);\r
  width: 200px;\r
}\r
\r
/* \u2500\u2500 Access list (people with access) \u2500\u2500 */\r
.lq-col-share-access-list {\r
  display: flex;\r
  flex-direction: column;\r
  max-height: 208px;\r
  overflow-y: auto;\r
}\r
/* Locked while an immediate role-change/remove PUT is in flight (ES-32687) */\r
.lq-col-share-access-list--busy {\r
  opacity: 0.6;\r
  pointer-events: none;\r
}\r
\r
/* Search-as-you-type transient states (loading/empty/error) */\r
.lq-col-share-dropdown-status {\r
  padding: var(--space-xs) var(--space-sm);\r
  font-size: var(--text-p-sm-regular-size);\r
  color: var(--font-neutral-muted);\r
}\r
.lq-col-share-dropdown-status--error {\r
  color: var(--font-error-base);\r
}\r
\r
/* Size the group icon SVG correctly inside the small avatar */\r
.lq-col-share-member-row .oc-avatar-icon svg,\r
.lq-col-share-option .oc-avatar-icon svg {\r
  width: 12px;\r
  height: 12px;\r
}\r
\r
.lq-col-share-option-secondary {\r
  font-size: var(--text-p-sm-regular-size);\r
  line-height: var(--text-p-sm-regular-line-height);\r
  font-weight: var(--text-p-sm-regular-weight);\r
  color: var(--font-neutral-muted);\r
  white-space: nowrap;\r
  overflow: hidden;\r
  text-overflow: ellipsis;\r
}\r
\r
.lq-col-share-member-row {\r
  display: flex;\r
  align-items: center;\r
  gap: var(--space-xs);\r
  padding: var(--space-2xs) 0;\r
}\r
\r
.lq-col-share-member-name {\r
  font-size: var(--text-p-base-regular-size);\r
  line-height: var(--text-p-base-regular-line-height);\r
  font-weight: var(--text-p-base-regular-weight);\r
  color: var(--font-neutral-black);\r
  flex: 1;\r
  min-width: 0;\r
  white-space: nowrap;\r
  overflow: hidden;\r
  text-overflow: ellipsis;\r
}\r
.lq-col-share-member-name--pending {\r
  color: var(--font-neutral-muted);\r
}\r
\r
.lq-col-share-member-perm-label {\r
  font-size: var(--text-p-sm-regular-size);\r
  line-height: var(--text-p-sm-regular-line-height);\r
  font-weight: var(--text-p-sm-regular-weight);\r
  color: var(--font-neutral-black);\r
  flex-shrink: 0;\r
}\r
\r
.lq-col-share-confirm-row {\r
  display: flex;\r
  align-items: center;\r
  justify-content: space-between;\r
  gap: var(--space-xs);\r
  padding: var(--space-2xs) 0;\r
}\r
\r
.lq-col-share-confirm-text {\r
  font-size: var(--text-p-sm-regular-size);\r
  line-height: var(--text-p-sm-regular-line-height);\r
  font-weight: var(--text-p-sm-regular-weight);\r
  color: var(--font-neutral-base);\r
  flex: 1;\r
  min-width: 0;\r
}\r
\r
.lq-col-share-confirm-actions {\r
  display: flex;\r
  gap: var(--space-2xs);\r
  flex-shrink: 0;\r
}\r
\r
/* Per-row permission button */\r
.lq-col-share-member-perm-wrap {\r
  flex-shrink: 0;\r
}\r
\r
.lq-col-share-member-perm-btn[aria-expanded=true] {\r
  background: var(--bg-secondary-light) !important;\r
  color: var(--font-secondary-pressed) !important;\r
}\r
\r
/* Portal dropdown \u2014 direct child of modal, escapes access-list overflow */\r
.lq-col-share-member-portal {\r
  position: absolute;\r
  z-index: 600;\r
  width: 160px;\r
  background: var(--bg-neutral-white);\r
  border: 1px solid var(--stroke-neutral-white);\r
  border-radius: var(--radius-lg);\r
  box-shadow: 0 4px 6px -2px rgba(45, 57, 58, 0.05), 0 10px 15px -3px rgba(45, 57, 58, 0.1);\r
  display: flex;\r
  flex-direction: column;\r
  padding: var(--space-2xs);\r
  gap: var(--space-3xs);\r
}\r
.lq-col-share-member-portal[hidden] {\r
  display: none !important;\r
}\r
.lq-col-share-member-portal .oc-list-item {\r
  height: auto;\r
  padding: var(--space-2xs) var(--space-xs);\r
  align-items: center;\r
}\r
.lq-col-share-member-portal .oc-list-item.lq-list-item--danger.oc-list-item-pressed {\r
  background-color: var(--bg-error-base-alt);\r
}\r
\r
/* \u2500\u2500 Upload Documents modal \u2500\u2500 */\r
.lq-upload-modal {\r
  width: 560px;\r
}\r
\r
.lq-upload-body {\r
  display: flex;\r
  flex-direction: column;\r
  gap: var(--space-md);\r
}\r
\r
.lq-upload-dropzone {\r
  /* SVG dashed border \u2014 controls dash size/gap, rounded corners, color */\r
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='16' ry='16' stroke='%23A9C1B8' stroke-width='2' stroke-dasharray='8%2c 6' stroke-linecap='round'/%3e%3c/svg%3e");\r
  border-radius: var(--radius-lg);\r
  padding: var(--space-4xl) var(--space-xl);\r
  display: flex;\r
  flex-direction: column;\r
  align-items: center;\r
  justify-content: center;\r
  gap: var(--space-2xs);\r
  cursor: pointer;\r
  transition: background-color 0.15s ease;\r
  outline: none;\r
}\r
.lq-upload-dropzone:hover, .lq-upload-dropzone:focus-visible, .lq-upload-dropzone--dragover {\r
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='16' ry='16' stroke='%23445556' stroke-width='2' stroke-dasharray='8%2c 6' stroke-linecap='round'/%3e%3c/svg%3e");\r
  background-color: var(--bg-primary-lightest);\r
}\r
\r
.lq-upload-dropzone__main {\r
  font-size: var(--text-p-base-regular-size);\r
  line-height: var(--text-p-base-regular-line-height);\r
  font-weight: var(--text-p-base-regular-weight);\r
  color: var(--font-neutral-base);\r
  margin: 0;\r
  text-align: center;\r
}\r
\r
.lq-upload-dropzone__browse {\r
  color: var(--font-secondary-base);\r
  font-weight: 500;\r
}\r
\r
/* Upload status indicator */\r
.lq-doc-status {\r
  font-size: var(--text-p-sm-regular-size);\r
  line-height: var(--text-p-sm-regular-line-height);\r
  font-weight: var(--text-p-sm-regular-weight);\r
  color: var(--font-secondary-base);\r
  white-space: nowrap;\r
  flex-shrink: 0;\r
  margin-left: auto;\r
  display: inline-flex;\r
  align-items: baseline;\r
  gap: 0;\r
}\r
\r
.lq-doc-status--row {\r
  margin-left: 0;\r
}\r
\r
.lq-doc-status__dots {\r
  display: inline-flex;\r
  gap: 1px;\r
}\r
.lq-doc-status__dots span {\r
  display: inline-block;\r
  opacity: 0;\r
  animation: lq-dot-appear 1.4s infinite;\r
}\r
.lq-doc-status__dots span::after {\r
  content: ".";\r
}\r
.lq-doc-status__dots span:nth-child(1) {\r
  animation-delay: 0s;\r
}\r
.lq-doc-status__dots span:nth-child(2) {\r
  animation-delay: 0.2s;\r
}\r
.lq-doc-status__dots span:nth-child(3) {\r
  animation-delay: 0.4s;\r
}\r
\r
@keyframes lq-dot-appear {\r
  0%, 60%, 100% {\r
    opacity: 0;\r
  }\r
  30% {\r
    opacity: 1;\r
  }\r
}\r
.lq-doc-uploaded-tag .oc-tag-icon svg {\r
  width: 12px;\r
  height: 12px;\r
}\r
\r
.lq-upload-error {\r
  background: var(--bg-error-lightest);\r
  border: 1px solid var(--stroke-error-base);\r
  border-radius: var(--radius-md);\r
  padding: var(--space-xs) var(--space-md);\r
  font-size: var(--text-p-sm-regular-size);\r
  line-height: var(--text-p-sm-regular-line-height);\r
  font-weight: var(--text-p-sm-regular-weight);\r
  color: var(--font-error-base);\r
  line-height: 1.6;\r
}\r
.lq-upload-error[hidden] {\r
  display: none !important;\r
}\r
\r
.lq-upload-file-list {\r
  display: flex;\r
  flex-direction: column;\r
  gap: var(--space-2xs);\r
  max-height: 280px;\r
  overflow-y: auto;\r
}\r
.lq-upload-file-list[hidden] {\r
  display: none !important;\r
}\r
\r
.lq-upload-file-row {\r
  display: flex;\r
  align-items: center;\r
  gap: var(--space-xs);\r
  padding: var(--space-2xs) var(--space-2xs);\r
  border: 1px solid var(--stroke-neutral-base, #D9E2E3);\r
  border-radius: var(--radius-md);\r
  background: var(--bg-neutral-white);\r
  flex-shrink: 0;\r
}\r
\r
.lq-upload-file-row__name {\r
  font-size: var(--text-p-base-regular-size);\r
  line-height: var(--text-p-base-regular-line-height);\r
  font-weight: var(--text-p-base-regular-weight);\r
  color: var(--font-neutral-black);\r
  flex: 1;\r
  min-width: 0;\r
  white-space: nowrap;\r
  overflow: hidden;\r
  text-overflow: ellipsis;\r
}\r
\r
/* Upload progress tracker (fixed bottom-right panel) */\r
.lq-upload-tracker {\r
  position: fixed;\r
  bottom: var(--space-xl);\r
  right: var(--space-xl);\r
  width: 360px;\r
  background: var(--bg-neutral-white);\r
  border: 1px solid var(--stroke-neutral-base, #D9E2E3);\r
  border-radius: var(--radius-lg);\r
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.06), 0 16px 32px rgba(0, 0, 0, 0.1);\r
  z-index: 2000;\r
  overflow: hidden;\r
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);\r
}\r
.lq-upload-tracker[hidden] {\r
  display: none !important;\r
}\r
\r
/* Peek strip \u2014 shown when minimized, peeks above viewport bottom */\r
.lq-upload-tracker__peek {\r
  position: absolute;\r
  top: 0;\r
  left: 0;\r
  right: 0;\r
  height: 44px;\r
  display: flex;\r
  align-items: center;\r
  gap: var(--space-2xs);\r
  padding: 0 var(--space-md);\r
  background: var(--bg-primary-lightest);\r
  border-radius: var(--radius-lg) var(--radius-lg) 0 0;\r
  cursor: pointer;\r
  opacity: 0;\r
  pointer-events: none;\r
  transition: opacity 0.2s ease;\r
  z-index: 2;\r
}\r
\r
.lq-upload-tracker__peek-spinner {\r
  flex-shrink: 0;\r
  width: 16px;\r
  height: 16px;\r
  border-radius: 50%;\r
  border: 2px solid var(--bg-primary-light, #D1E1DD);\r
  border-top-color: var(--stroke-secondary-base, #235944);\r
  animation: lq-spin 0.85s linear infinite;\r
}\r
\r
.lq-upload-tracker__peek-check-icon,\r
.lq-upload-tracker__peek-error-icon {\r
  display: none;\r
  flex-shrink: 0;\r
  width: 16px;\r
  height: 16px;\r
  align-items: center;\r
  justify-content: center;\r
}\r
\r
.lq-upload-tracker--peek-success .lq-upload-tracker__peek-spinner {\r
  display: none;\r
}\r
.lq-upload-tracker--peek-success .lq-upload-tracker__peek-check-icon {\r
  display: inline-flex;\r
  color: var(--font-success-base, #16A34A);\r
}\r
\r
.lq-upload-tracker--peek-error .lq-upload-tracker__peek-spinner {\r
  display: none;\r
}\r
.lq-upload-tracker--peek-error .lq-upload-tracker__peek-error-icon {\r
  display: inline-flex;\r
  color: var(--font-error-base, #DC2626);\r
}\r
\r
.lq-upload-tracker__peek-text {\r
  font-size: var(--text-p-sm-regular-size);\r
  line-height: var(--text-p-sm-regular-line-height);\r
  font-weight: var(--text-p-sm-regular-weight);\r
  color: var(--font-neutral-black);\r
  flex: 1;\r
  min-width: 0;\r
  transition: opacity 0.15s ease, transform 0.15s ease;\r
}\r
.lq-upload-tracker__peek-text--hidden {\r
  opacity: 0;\r
  transform: translateY(-5px);\r
}\r
.lq-upload-tracker__peek-text--from-below {\r
  opacity: 0;\r
  transform: translateY(5px);\r
}\r
.lq-upload-tracker__peek-text--success {\r
  color: var(--font-success-base, #16A34A);\r
  font-weight: 500;\r
}\r
.lq-upload-tracker__peek-text--error {\r
  color: var(--font-error-base, #DC2626);\r
  font-weight: 500;\r
}\r
\r
.lq-upload-tracker__peek-hint {\r
  font-size: var(--text-p-sm-regular-size);\r
  line-height: var(--text-p-sm-regular-line-height);\r
  font-weight: var(--text-p-sm-regular-weight);\r
  color: var(--font-neutral-muted);\r
  flex-shrink: 0;\r
  opacity: 0;\r
  transform: translateX(6px);\r
  transition: opacity 0.2s ease 0.1s, transform 0.2s ease 0.1s;\r
}\r
\r
/* Minimized state \u2014 slides down-right, peek strip visible at bottom corner */\r
.lq-upload-tracker--minimized {\r
  transform: translate(140px, calc(var(--space-xl) + 100% - 44px));\r
  cursor: pointer;\r
}\r
.lq-upload-tracker--minimized .lq-upload-tracker__inline-body {\r
  display: none !important;\r
}\r
.lq-upload-tracker--minimized .lq-upload-tracker__peek {\r
  opacity: 1;\r
  pointer-events: auto;\r
}\r
.lq-upload-tracker--minimized .lq-upload-tracker__peek:hover .lq-upload-tracker__peek-hint {\r
  opacity: 1;\r
  transform: translateX(0);\r
}\r
.lq-upload-tracker--minimized.lq-upload-tracker--minimized-hover {\r
  transform: translate(0, 0);\r
  transition: transform 0.3s ease-out;\r
}\r
.lq-upload-tracker--minimized.lq-upload-tracker--minimized-hover .lq-upload-tracker__peek {\r
  opacity: 0;\r
  pointer-events: none;\r
}\r
.lq-upload-tracker--minimized.lq-upload-tracker--minimized-hover .lq-upload-tracker__btns button {\r
  opacity: 0;\r
  pointer-events: none;\r
}\r
.lq-upload-tracker--minimized.lq-upload-tracker--minimized-hover .lq-upload-tracker__pin-hint {\r
  opacity: 1;\r
}\r
\r
/* Header: always visible, neutral bg + bottom border */\r
.lq-upload-tracker__header {\r
  display: flex;\r
  align-items: center;\r
  gap: var(--space-xs);\r
  padding: var(--space-xs) var(--space-md);\r
  background: var(--bg-primary-lightest);\r
  border-bottom: 1px solid var(--stroke-neutral-base, #D9E2E3);\r
}\r
\r
.lq-upload-tracker__spinner {\r
  flex-shrink: 0;\r
  width: 20px;\r
  height: 20px;\r
  border-radius: 50%;\r
  border: 2px solid var(--bg-primary-light, #D1E1DD);\r
  border-top-color: var(--stroke-secondary-base, #235944);\r
  animation: lq-spin 0.85s linear infinite;\r
}\r
\r
.lq-upload-tracker__done-icon {\r
  display: none;\r
  flex-shrink: 0;\r
  width: 20px;\r
  height: 20px;\r
  align-items: center;\r
  justify-content: center;\r
  color: var(--font-success-base, #16A34A);\r
}\r
\r
.lq-upload-tracker__info {\r
  flex: 1;\r
  min-width: 0;\r
  display: flex;\r
  flex-direction: column;\r
  gap: 1px;\r
}\r
\r
.lq-upload-tracker__name {\r
  font-size: var(--text-p-base-medium-size);\r
  line-height: var(--text-p-base-medium-line-height);\r
  font-weight: var(--text-p-base-medium-weight);\r
  color: var(--font-neutral-black);\r
  white-space: nowrap;\r
  overflow: hidden;\r
  text-overflow: ellipsis;\r
}\r
\r
.lq-upload-tracker__count {\r
  font-size: var(--text-p-sm-regular-size);\r
  line-height: var(--text-p-sm-regular-line-height);\r
  font-weight: var(--text-p-sm-regular-weight);\r
  color: var(--font-neutral-muted);\r
}\r
\r
.lq-upload-tracker__btns {\r
  display: flex;\r
  align-items: center;\r
  gap: var(--space-3xs);\r
  flex-shrink: 0;\r
  position: relative;\r
}\r
.lq-upload-tracker__btns button {\r
  transition: opacity 0.15s ease;\r
}\r
\r
.lq-upload-tracker__pin-hint {\r
  position: absolute;\r
  right: 0;\r
  font-size: var(--text-p-sm-regular-size);\r
  line-height: var(--text-p-sm-regular-line-height);\r
  font-weight: var(--text-p-sm-regular-weight);\r
  color: var(--font-primary-base);\r
  white-space: nowrap;\r
  opacity: 0;\r
  pointer-events: none;\r
  transition: opacity 0.2s ease;\r
}\r
\r
/* Collapsed body: compact inline stats row */\r
.lq-upload-tracker__inline-body {\r
  padding: var(--space-xs) var(--space-md);\r
}\r
.lq-upload-tracker__inline-body[hidden] {\r
  display: none !important;\r
}\r
\r
.lq-upload-tracker__inline-stats {\r
  display: flex;\r
  align-items: center;\r
  gap: var(--space-xs);\r
}\r
\r
.lq-upload-tracker__inline-stat {\r
  display: inline-flex;\r
  align-items: center;\r
  gap: 5px;\r
  font-size: var(--text-p-sm-regular-size);\r
  line-height: var(--text-p-sm-regular-line-height);\r
  font-weight: var(--text-p-sm-regular-weight);\r
  color: var(--font-neutral-muted);\r
  white-space: nowrap;\r
}\r
.lq-upload-tracker__inline-stat[hidden] {\r
  display: none !important;\r
}\r
.lq-upload-tracker__inline-stat svg {\r
  width: 14px;\r
  height: 14px;\r
  flex-shrink: 0;\r
}\r
.lq-upload-tracker__inline-stat .lq-doc-status__dots {\r
  display: inline-flex;\r
  gap: 1px;\r
}\r
.lq-upload-tracker__inline-stat .lq-doc-status__dots span {\r
  display: inline-block;\r
  opacity: 0;\r
  animation: lq-dot-appear 1.4s infinite;\r
}\r
.lq-upload-tracker__inline-stat .lq-doc-status__dots span::after {\r
  content: ".";\r
}\r
.lq-upload-tracker__inline-stat .lq-doc-status__dots span:nth-child(1) {\r
  animation-delay: 0s;\r
}\r
.lq-upload-tracker__inline-stat .lq-doc-status__dots span:nth-child(2) {\r
  animation-delay: 0.2s;\r
}\r
.lq-upload-tracker__inline-stat .lq-doc-status__dots span:nth-child(3) {\r
  animation-delay: 0.4s;\r
}\r
\r
.lq-upload-tracker__inline-sep {\r
  width: 1px;\r
  height: 14px;\r
  background: var(--stroke-neutral-base, #D9E2E3);\r
  flex-shrink: 0;\r
}\r
.lq-upload-tracker__inline-sep[hidden] {\r
  display: none !important;\r
}\r
\r
/* Expanded body: dynamic sections */\r
.lq-upload-tracker__detail-body[hidden] {\r
  display: none !important;\r
}\r
\r
.lq-ut-section {\r
  padding: var(--space-xs) var(--space-md);\r
}\r
.lq-ut-section + .lq-ut-section {\r
  border-top: 1px solid var(--stroke-neutral-base, #D9E2E3);\r
}\r
\r
.lq-ut-section__row {\r
  display: flex;\r
  align-items: center;\r
  gap: var(--space-2xs);\r
}\r
\r
.lq-ut-section__icon {\r
  flex-shrink: 0;\r
  display: flex;\r
  align-items: center;\r
  color: var(--font-neutral-muted);\r
}\r
.lq-ut-section__icon svg {\r
  width: 16px;\r
  height: 16px;\r
}\r
\r
.lq-ut-section__title {\r
  font-size: var(--text-p-sm-regular-size);\r
  line-height: var(--text-p-sm-regular-line-height);\r
  font-weight: var(--text-p-sm-regular-weight);\r
  color: var(--font-neutral-black);\r
  white-space: nowrap;\r
  display: inline-flex;\r
  align-items: baseline;\r
  gap: 0;\r
  flex-shrink: 0;\r
}\r
.lq-ut-section__title .lq-doc-status__dots {\r
  display: inline-flex;\r
  gap: 1px;\r
}\r
.lq-ut-section__title .lq-doc-status__dots span {\r
  display: inline-block;\r
  opacity: 0;\r
  animation: lq-dot-appear 1.4s infinite;\r
}\r
.lq-ut-section__title .lq-doc-status__dots span::after {\r
  content: ".";\r
}\r
.lq-ut-section__title .lq-doc-status__dots span:nth-child(1) {\r
  animation-delay: 0s;\r
}\r
.lq-ut-section__title .lq-doc-status__dots span:nth-child(2) {\r
  animation-delay: 0.2s;\r
}\r
.lq-ut-section__title .lq-doc-status__dots span:nth-child(3) {\r
  animation-delay: 0.4s;\r
}\r
\r
.lq-ut-section__bar {\r
  flex: 1;\r
  height: 6px;\r
  border-radius: var(--radius-rounded);\r
  background: var(--bg-primary-lighter);\r
  overflow: hidden;\r
  min-width: 0;\r
}\r
\r
.lq-ut-section__bar-fill {\r
  height: 100%;\r
  border-radius: var(--radius-rounded);\r
  background: var(--bg-primary-base);\r
  transition: width 0.4s ease;\r
}\r
\r
.lq-ut-section__toggle {\r
  flex-shrink: 0;\r
}\r
.lq-ut-section__toggle svg {\r
  transition: transform 0.25s ease;\r
}\r
.lq-ut-section__toggle--open svg {\r
  transform: rotate(-180deg);\r
}\r
\r
.lq-ut-section__docs {\r
  overflow: hidden;\r
  max-height: 0;\r
  opacity: 0;\r
  padding-top: 0;\r
  transition: max-height 0.3s ease, opacity 0.25s ease, padding-top 0.3s ease;\r
}\r
.lq-ut-section__docs--open {\r
  max-height: 600px;\r
  opacity: 1;\r
  padding-top: var(--space-2xs);\r
}\r
\r
.lq-ut-doc-row {\r
  display: flex;\r
  align-items: center;\r
  gap: var(--space-xs);\r
  padding: var(--space-2xs) 0;\r
}\r
.lq-ut-doc-row + .lq-ut-doc-row {\r
  border-top: 1px solid var(--stroke-neutral-base, #D9E2E3);\r
}\r
\r
.lq-ut-doc-row__icon {\r
  flex-shrink: 0;\r
  display: flex;\r
  align-items: center;\r
}\r
.lq-ut-doc-row__icon svg {\r
  width: 28px;\r
  height: 28px;\r
}\r
\r
.lq-ut-doc-row__name {\r
  font-size: var(--text-p-sm-regular-size);\r
  line-height: var(--text-p-sm-regular-line-height);\r
  font-weight: var(--text-p-sm-regular-weight);\r
  color: var(--font-neutral-black);\r
  flex: 1;\r
  min-width: 0;\r
  white-space: nowrap;\r
  overflow: hidden;\r
  text-overflow: ellipsis;\r
}\r
\r
.lq-ut-doc-row__pct {\r
  font-size: var(--text-p-sm-regular-size);\r
  line-height: var(--text-p-sm-regular-line-height);\r
  font-weight: var(--text-p-sm-regular-weight);\r
  color: var(--font-neutral-muted);\r
  flex-shrink: 0;\r
}\r
\r
/* Doc row status icon (replaces % for done/error) */\r
.lq-ut-doc-row__status {\r
  flex-shrink: 0;\r
  display: flex;\r
  align-items: center;\r
}\r
.lq-ut-doc-row__status svg {\r
  width: 14px;\r
  height: 14px;\r
}\r
.lq-ut-doc-row__status--done {\r
  color: var(--font-success-base, #16A34A);\r
}\r
.lq-ut-doc-row__status--error {\r
  color: var(--font-error-base, #DC2626);\r
}\r
\r
/* Multi-collection groups in expanded view */\r
/* Collection pagination nav (multi-collection expanded view) */\r
.lq-ut-col-nav {\r
  display: flex;\r
  align-items: center;\r
  gap: var(--space-2xs);\r
  padding: var(--space-2xs) var(--space-xs);\r
  border-bottom: 1px solid var(--stroke-neutral-base, #D9E2E3);\r
  background: var(--bg-neutral-lightest, #F9FAFB);\r
}\r
\r
.lq-ut-col-nav__label {\r
  font-size: var(--text-p-sm-medium-size);\r
  line-height: var(--text-p-sm-medium-line-height);\r
  font-weight: var(--text-p-sm-medium-weight);\r
  flex: 1;\r
  display: flex;\r
  align-items: center;\r
  justify-content: center;\r
  gap: var(--space-2xs);\r
  min-width: 0;\r
  color: var(--font-neutral-black);\r
  overflow: hidden;\r
  white-space: nowrap;\r
  text-overflow: ellipsis;\r
}\r
\r
.lq-ut-col-nav__page {\r
  font-size: var(--text-p-sm-regular-size);\r
  line-height: var(--text-p-sm-regular-line-height);\r
  font-weight: var(--text-p-sm-regular-weight);\r
  color: var(--font-neutral-muted);\r
  flex-shrink: 0;\r
}\r
\r
.lq-ut-col-nav--done {\r
  background: var(--bg-success-lightest, #F0FDF4);\r
  justify-content: center;\r
}\r
\r
.lq-ut-col-nav__done-msg {\r
  font-size: var(--text-p-sm-medium-size);\r
  line-height: var(--text-p-sm-medium-line-height);\r
  font-weight: var(--text-p-sm-medium-weight);\r
  color: var(--font-success-base, #16A34A);\r
  display: flex;\r
  align-items: center;\r
  gap: var(--space-2xs);\r
}\r
\r
/* Done section */\r
.lq-ut-section--done .lq-ut-section__icon {\r
  color: var(--font-success-base, #16A34A);\r
}\r
.lq-ut-section--done .lq-ut-section__badge {\r
  background: var(--bg-success-base, #DCFCE7);\r
  color: var(--font-success-base, #16A34A);\r
}\r
\r
/* Error section */\r
.lq-ut-section--error {\r
  background: var(--bg-error-lightest, #FEF2F2);\r
}\r
.lq-ut-section--error .lq-ut-section__icon {\r
  color: var(--font-error-base, #DC2626);\r
}\r
.lq-ut-section--error .lq-ut-section__title {\r
  color: var(--font-error-base, #DC2626);\r
}\r
.lq-ut-section--error .lq-ut-section__badge {\r
  background: var(--bg-error-lighter, #FECACA);\r
  color: var(--font-error-base, #DC2626);\r
}\r
\r
.lq-ut-doc-row--error .lq-ut-doc-row__name {\r
  color: var(--font-error-base, #DC2626);\r
}\r
\r
/* Done inline stat */\r
.lq-upload-tracker__inline-stat--done {\r
  color: var(--font-success-base, #16A34A);\r
}\r
.lq-upload-tracker__inline-stat--done[hidden] {\r
  display: none !important;\r
}\r
\r
/* Error inline stat */\r
.lq-upload-tracker__inline-stat--error {\r
  color: var(--font-error-base, #DC2626);\r
}\r
.lq-upload-tracker__inline-stat--error[hidden] {\r
  display: none !important;\r
}\r
\r
/* Peek error state */\r
.lq-upload-tracker--has-errors .lq-upload-tracker__peek {\r
  background: var(--bg-error-lightest, #FEF2F2);\r
}\r
.lq-upload-tracker--has-errors .lq-upload-tracker__peek .lq-upload-tracker__peek-spinner {\r
  border-color: var(--bg-error-lighter, #FECACA);\r
  border-top-color: var(--font-error-base, #DC2626);\r
}\r
\r
/* X button on completed doc rows \u2014 always visible */\r
.lq-ut-doc-row__remove {\r
  flex-shrink: 0;\r
}\r
\r
/* "Complete" text label in done rows */\r
.lq-ut-doc-row__done-label {\r
  font-size: var(--text-p-sm-regular-size);\r
  line-height: var(--text-p-sm-regular-line-height);\r
  font-weight: var(--text-p-sm-regular-weight);\r
  color: var(--font-success-base, #16A34A);\r
  flex-shrink: 0;\r
  white-space: nowrap;\r
}\r
\r
/* Why a file failed or will not be indexed (job errors[].error /\r
   rejected[].reason). Shrinks before the file name does, and truncates -- the\r
   full text is on the row's title attribute. */\r
.lq-ut-doc-row__msg {\r
  font-size: var(--text-p-xs-regular-size);\r
  line-height: var(--text-p-xs-regular-line-height);\r
  color: var(--font-neutral-muted);\r
  flex: 0 1 auto;\r
  min-width: 0;\r
  white-space: nowrap;\r
  overflow: hidden;\r
  text-overflow: ellipsis;\r
}\r
\r
/* Flash the file count green when a doc completes */\r
.lq-upload-tracker__count--flash {\r
  color: var(--font-success-base, #16A34A) !important;\r
  font-weight: 500;\r
  transition: color 0.2s ease;\r
}\r
\r
/* All-done state \u2014 green header banner */\r
.lq-upload-tracker--all-done .lq-upload-tracker__header {\r
  background: var(--bg-success-lightest, #F0FDF4);\r
}\r
.lq-upload-tracker--all-done .lq-upload-tracker__spinner {\r
  display: none;\r
}\r
.lq-upload-tracker--all-done .lq-upload-tracker__done-icon {\r
  display: inline-flex;\r
}\r
.lq-upload-tracker--all-done .lq-upload-tracker__inline-body,\r
.lq-upload-tracker--all-done .lq-upload-tracker__detail-body {\r
  display: none !important;\r
}\r
.lq-upload-tracker--all-done .lq-upload-tracker__count {\r
  color: var(--font-success-base, #16A34A);\r
  font-weight: 500;\r
}\r
.lq-upload-tracker--all-done .lq-upload-tracker__peek {\r
  background: var(--bg-success-lightest, #F0FDF4);\r
}\r
.lq-upload-tracker--all-done .lq-upload-tracker__peek .lq-upload-tracker__peek-spinner {\r
  border-color: var(--bg-success-lighter, #BBF7D0);\r
  border-top-color: var(--font-success-base, #16A34A);\r
}\r
\r
/* Per-collection completion flash (multi-collection only) */\r
.lq-upload-tracker--col-complete .lq-upload-tracker__header {\r
  background: var(--bg-success-lightest, #F0FDF4);\r
}\r
.lq-upload-tracker--col-complete .lq-upload-tracker__spinner {\r
  display: none;\r
}\r
.lq-upload-tracker--col-complete .lq-upload-tracker__done-icon {\r
  display: inline-flex;\r
}\r
.lq-upload-tracker--col-complete .lq-upload-tracker__name {\r
  color: var(--font-success-base, #16A34A);\r
}\r
.lq-upload-tracker--col-complete .lq-upload-tracker__count {\r
  color: var(--font-success-base, #16A34A);\r
  font-weight: 500;\r
}\r
.lq-upload-tracker--col-complete .lq-upload-tracker__inline-body {\r
  display: none !important;\r
}\r
\r
/* Dismissing animation */\r
.lq-upload-tracker--dismissing {\r
  opacity: 0 !important;\r
  transform: translateY(12px) scale(0.96) !important;\r
  transition: opacity 0.3s ease, transform 0.3s ease !important;\r
  pointer-events: none !important;\r
}\r
\r
/* Tracker header chevron rotation */\r
#ut-collapse-btn svg {\r
  transition: transform 0.25s ease;\r
  transform: rotate(180deg);\r
}\r
\r
.lq-upload-tracker--expanded #ut-collapse-btn svg {\r
  transform: rotate(0deg);\r
}\r
\r
.lq-upload-tracker--all-done #ut-collapse-btn {\r
  display: none;\r
}\r
\r
/* Hide tracker while user is inside a collection detail view.\r
   Was \`body.lq-in-col-detail #lq-upload-tracker\` (a host-page <body> class) \u2014\r
   rewritten to a scoped :has() check since #col-detail-view is now a sibling\r
   inside this component's own shadow root. */\r
:host(:has(#col-detail-view:not([hidden]))) #lq-upload-tracker {\r
  display: none !important;\r
}\r
\r
/* \u2500\u2500 Mobile responsiveness \u2500\u2500 */\r
@media (max-width: 768px) {\r
  .lq-col-share-modal,\r
  .lq-col-edit-modal,\r
  .lq-upload-modal {\r
    width: calc(100vw - var(--space-md) * 2);\r
    max-height: 90vh;\r
    overflow-y: auto;\r
  }\r
  /* Upload floats top-right above the normal flow, so it doesn't have to move\r
     out of .lq-cdv-controls (which would change its desktop position). */\r
  .lq-col-detail-view {\r
    position: relative;\r
    padding: calc(var(--row-height-md) + var(--space-xs) * 2) var(--space-xs) 0;\r
    overflow-y: auto;\r
  }\r
  #col-detail-upload {\r
    position: absolute;\r
    top: var(--space-xs);\r
    right: var(--space-xs);\r
  }\r
  /* Header: Delete/Share/Edit collapse into a "more" menu button that sits\r
     on the title row (back stays next to the title, as on desktop). */\r
  .lq-cdv-header {\r
    flex-wrap: wrap;\r
    gap: var(--space-xs);\r
  }\r
  .lq-cdv-actions {\r
    display: none;\r
  }\r
  #cdv-more-btn {\r
    display: flex;\r
    order: 4;\r
  }\r
  #col-detail-back {\r
    order: 2;\r
  }\r
  .lq-cdv-title {\r
    order: 3;\r
    flex: 1;\r
    min-width: 0;\r
  }\r
  .lq-cdv-grid,\r
  .lq-doc-list {\r
    overflow-y: visible;\r
  }\r
  /* Order must be after #col-detail-select-btn (order: 5) so the Cancel\r
     button stays on the toggle/search line while the selbar wraps below it. */\r
  .lq-cdv-selbar:not([hidden]) {\r
    flex-basis: 100%;\r
    flex-wrap: wrap;\r
    margin-left: 0;\r
    order: 6;\r
  }\r
  .lq-doc-list-header,\r
  .lq-doc-row {\r
    grid-template-columns: minmax(0, 1fr) auto var(--row-height-md);\r
  }\r
  .lq-cdv-list--selecting .lq-doc-list-header,\r
  .lq-cdv-list--selecting .lq-doc-row {\r
    grid-template-columns: 28px minmax(0, 1fr) auto var(--row-height-md);\r
  }\r
  .lq-doc-row__size,\r
  .lq-doc-row__date {\r
    display: none !important;\r
  }\r
  .lq-doc-list__hdr-size,\r
  .lq-doc-list__hdr-date {\r
    display: none !important;\r
  }\r
  .lq-doc-card__btn-del {\r
    opacity: 1 !important;\r
    width: 36px !important;\r
    height: 36px !important;\r
    border-radius: 50% !important;\r
  }\r
  .lq-doc-card__btn-del svg, .lq-doc-card__btn-del i {\r
    width: 14px !important;\r
    height: 14px !important;\r
  }\r
}\r

/* \u2500\u2500 Collection doc preview panel \u2500\u2500 */\r
.lq-cdp.lq-detail-panel--open {\r
  width: 40%;\r
  min-width: 280px;\r
}\r
\r
.lq-cdp.lq-cdp--with-passages.lq-detail-panel--open {\r
  width: 60%;\r
}\r
\r
/* \u2500\u2500 Passages sidebar \u2014 active only when opened from message resources \u2500\u2500 */\r
.lq-cdp--with-passages .lq-dp-doc-preview__body {\r
  flex-direction: row;\r
  overflow: hidden;\r
  padding-top: 0;\r
}\r
\r
.lq-cdp--with-passages .lq-dp-doc-preview__pages {\r
  flex: 1;\r
  min-width: 0;\r
  overflow-y: auto;\r
  padding-top: var(--space-lg);\r
}\r
\r
.lq-passages-sidebar {\r
  width: 260px;\r
  flex-shrink: 0;\r
  display: flex;\r
  flex-direction: column;\r
  border-right: 1px solid var(--stroke-neutral-white);\r
  background: var(--bg-neutral-white);\r
  overflow: hidden;\r
  transition: width 0.2s ease;\r
}\r
.lq-passages-sidebar[hidden] {\r
  display: none !important;\r
}\r
.lq-passages-sidebar--collapsed {\r
  width: 40px;\r
}\r
.lq-passages-sidebar--collapsed .lq-passages-sidebar__full {\r
  display: none;\r
}\r
.lq-passages-sidebar--collapsed .lq-passages-sidebar__collapsed-strip {\r
  display: flex;\r
}\r
\r
.lq-passages-sidebar__full {\r
  display: flex;\r
  flex-direction: column;\r
  height: 100%;\r
  overflow: hidden;\r
}\r
\r
.lq-passages-sidebar__collapsed-strip {\r
  display: none;\r
  flex-direction: column;\r
  align-items: center;\r
  padding-top: var(--space-xs);\r
  height: 100%;\r
}\r
\r
.lq-passages-sidebar__header {\r
  display: flex;\r
  align-items: center;\r
  justify-content: space-between;\r
  padding: var(--space-md) var(--space-xs) var(--space-xs) var(--space-md);\r
  flex-shrink: 0;\r
}\r
\r
.lq-passages-sidebar__title {\r
  font-size: var(--text-p-base-medium-size);\r
  line-height: var(--text-p-base-medium-line-height);\r
  font-weight: var(--text-p-base-medium-weight);\r
  color: var(--font-neutral-black);\r
}\r
\r
.lq-passages-sidebar__list {\r
  flex: 1;\r
  overflow-y: auto;\r
  padding: var(--space-2xs) var(--space-xs) var(--space-md);\r
  display: flex;\r
  flex-direction: column;\r
  gap: var(--space-2xs);\r
}\r
\r
/* Passage text highlight inside doc pages */\r
.lq-passage-highlight {\r
  background: var(--bg-primary-lighter);\r
  border-radius: 2px;\r
  padding: 1px 0;\r
  color: inherit;\r
}\r
\r
/* Passage items use oc-list-item system */\r
.lq-passages-sidebar__item.oc-list-item {\r
  align-items: flex-start;\r
  height: auto;\r
  min-height: unset;\r
}\r
.lq-passages-sidebar__item.oc-list-item .oc-list-item-text {\r
  white-space: normal;\r
  overflow: hidden;\r
  text-overflow: unset;\r
  display: -webkit-box;\r
  -webkit-box-orient: vertical;\r
  -webkit-line-clamp: 3;\r
  color: var(--font-neutral-black);\r
}\r
.lq-passages-sidebar__item.oc-list-item .oc-list-item-subtext {\r
  white-space: normal;\r
  color: var(--font-primary-base);\r
}\r
\r
/* Active card/row state while its preview is open */\r
.lq-doc-card--preview-active {\r
  border-color: var(--stroke-primary-base) !important;\r
  background: var(--bg-primary-lightest) !important;\r
}\r
\r
.lq-doc-row--preview-active {\r
  border-color: var(--stroke-primary-base) !important;\r
  background: var(--bg-primary-lightest) !important;\r
}\r

/* Collections' own top-level rules. Concatenated after every vendor partial by\r
   scripts/generate-css.mjs \u2014 see that file for the full ordering (tokens,\r
   then generic oc-* components, then Collections' view-specific styles). */\r
\r
:host {\r
  display: flex;\r
  position: relative;\r
  flex: 1;\r
  overflow: hidden;\r
  background: var(--color-bg-main);\r
  font-family: 'Hanken Grotesk', sans-serif;\r
}\r
\r
/* This single stylesheet is adopted into all 3 elements' shadow roots (see\r
   internal/styles.ts) \u2014 <lexiq-collections> legitimately wants the\r
   overflow:hidden above (it owns real scrollable panels), but\r
   <lexiq-collection-picker> isn't a layout host: it's just an anchor point\r
   for floating Save/Move cards, often with zero intrinsic size on a host\r
   page (see its file header). Without this override, that overflow:hidden\r
   silently clips its own popover cards entirely whenever the anchor element\r
   has little/no box of its own \u2014 the common case. */\r
:host(lexiq-collection-picker) {\r
  overflow: visible;\r
}\r
\r
/* Overlay layer for floating popovers (Save/Move-to-collection cards) that\r
   need an appendChild target living inside the shadow root (to inherit\r
   adoptedStyleSheets) whose bounding box still matches the host element. */\r
.lq-picker-container {\r
  position: absolute;\r
  inset: 0;\r
  pointer-events: none;\r
  z-index: 15;\r
\r
  > * { pointer-events: auto; }\r
}\r
\r
/* Search-match highlight, emitted by internal/dom-utils.ts highlightSubstring()\r
   for collection and document names. Matches the treatment the vendored\r
   mark.lq-dp-search-highlight already uses in generic-detail-panel.css, kept\r
   under a name of our own rather than reusing a detail-panel class. The\r
   translucent wash plus color:inherit means it reads correctly over both the\r
   light and the [theme="dark"] backgrounds without a dark-mode override. */\r
mark.lq-search-highlight {\r
  background: rgba(234, 179, 8, 0.25);\r
  color: inherit;\r
  border-radius: 2px;\r
  padding: 0 1px;\r
}\r
\r
/* Upload tracker \u2014 connection / session banner (#ut-conn).\r
   Hand-written rather than appended to vendor/collection-detail-view.css: that\r
   file is vendored from lexiq-prototype and its header says so, so authoring new\r
   rules inside it would blur what came from the prototype and what did not. It\r
   is concatenated before this file (see scripts/generate-css.mjs), so these\r
   rules still land after every tracker rule they sit next to. */\r
.lq-ut-conn {\r
  display: flex;\r
  align-items: flex-start;\r
  gap: var(--space-2xs);\r
  padding: var(--space-2xs) var(--space-md);\r
  background: var(--bg-error-lightest);\r
  border-bottom: 1px solid var(--stroke-error-base);\r
  color: var(--font-error-base);\r
}\r
.lq-ut-conn[hidden] {\r
  display: none !important;\r
}\r
\r
/* injectIcons() REPLACES the <i data-icon> with the raw <svg>, so the box that\r
   carries the layout has to be the wrapping span, not the icon element. */\r
.lq-ut-conn__icon {\r
  flex-shrink: 0;\r
  display: inline-flex;\r
  width: 16px;\r
  height: 16px;\r
  /* Nudged onto the title's baseline \u2014 the icon box is shorter than the line. */\r
  margin-top: 2px;\r
}\r
\r
.lq-ut-conn__text {\r
  flex: 1;\r
  min-width: 0;\r
  display: flex;\r
  flex-direction: column;\r
  gap: 1px;\r
}\r
\r
.lq-ut-conn__title {\r
  font-size: var(--text-p-sm-medium-size);\r
  line-height: var(--text-p-sm-medium-line-height);\r
  font-weight: var(--text-p-sm-medium-weight);\r
  color: var(--font-error-base);\r
}\r
\r
.lq-ut-conn__detail,\r
.lq-ut-conn__countdown {\r
  font-size: var(--text-p-sm-regular-size);\r
  line-height: var(--text-p-sm-regular-line-height);\r
  font-weight: var(--text-p-sm-regular-weight);\r
  color: var(--font-neutral-muted);\r
}\r
.lq-ut-conn__detail:empty,\r
.lq-ut-conn__countdown:empty {\r
  display: none;\r
}\r
\r
/* The countdown changes every second; tabular figures keep it from jittering\r
   the line width as digits change. */\r
.lq-ut-conn__countdown {\r
  font-variant-numeric: tabular-nums;\r
}\r
\r
.lq-ut-conn__retry {\r
  flex-shrink: 0;\r
  align-self: center;\r
}\r
.lq-ut-conn__retry[hidden] {\r
  display: none !important;\r
}\r
\r
/* While the connection is down the header spinner is claiming progress that is\r
   not happening \u2014 freeze it rather than remove it, so the layout does not jump. */\r
.lq-upload-tracker--offline .lq-upload-tracker__spinner,\r
.lq-upload-tracker--offline .lq-upload-tracker__peek-spinner {\r
  animation-play-state: paused;\r
  border-top-color: var(--stroke-error-base);\r
}\r
\r
/* \u2500\u2500 Document preview body \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\r
   #cdp-preview-pages holds one of two bodies: the locally-built PAGES sheets\r
   (vendored .lq-dp-doc-preview__page rules in generic-detail-panel.css), or an\r
   <iframe> on the converted copy the preview web service returns for a real\r
   document. The vendored container centres fixed-width sheets with a gap\r
   between them \u2014 the wrong box for a frame that should simply fill the panel,\r
   hence a modifier here rather than an edit to the vendored rule. */\r
.lq-dp-doc-preview__pages--frame {\r
  flex: 1;\r
  min-height: 0;\r
  padding: 0;\r
  gap: 0;\r
  align-items: stretch;\r
}\r
\r
.lq-dp-doc-preview__frame {\r
  flex: 1;\r
  min-height: 0;\r
  width: 100%;\r
  border: 0;\r
  /* Paper, like the .lq-dp-doc-preview__page sheets it replaces: a converted\r
     document brings no background of its own, and stays white in both themes. */\r
  background: #fff;\r
}\r
\r
/* Shown in place of the document while the rendition loads, and when there is\r
   none to show. */\r
.lq-dp-doc-preview__message {\r
  margin: auto;\r
  padding: var(--space-2xl) var(--space-md);\r
  color: var(--font-neutral-muted);\r
  font-size: var(--text-p-sm-regular-size);\r
  line-height: var(--text-p-sm-regular-line-height);\r
  text-align: center;\r
}\r
\r
/* Wrapper introduced in internal/template.ts so the page-navigation subset of\r
   the toolbar can be hidden as a group; it has to reproduce the flex row that\r
   vendored .lq-dp-doc-preview__doc-controls gave those children directly. */\r
.lq-dp-doc-preview__page-nav {\r
  display: flex;\r
  align-items: center;\r
  gap: var(--space-3xs);\r
}\r
.lq-dp-doc-preview__page-nav[hidden] {\r
  display: none;\r
}\r
\r
/* \u2500\u2500 People picker (internal/principal-picker.ts) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\r
   The control reuses the vendored .lq-tag-input box and .lq-col-share-*\r
   dropdown rules; these are the parts that did not exist before it was shared\r
   between the share modal and the add/edit collection modal. Hand-written\r
   here rather than appended to vendor/collection-detail-view.css, which is\r
   vendored from lexiq-prototype \u2014 see the .lq-ut-conn block above for the\r
   same reasoning. */\r
\r
/* Role badge inside a chip: a two-value toggle (Owner \u21C4 Reader), so it has to\r
   read as pressable without becoming a second button-sized target next to the\r
   remove control. */\r
.lq-tag-input__role {\r
  border: none;\r
  background: none;\r
  padding: 0 0 0 var(--space-3xs);\r
  margin-left: var(--space-3xs);\r
  border-left: 1px solid var(--stroke-neutral-base);\r
  font-family: 'Hanken Grotesk', sans-serif;\r
  font-size: var(--text-p-sm-regular-size);\r
  line-height: 1;\r
  color: var(--font-neutral-muted);\r
  cursor: pointer;\r
}\r
.lq-tag-input__role:hover {\r
  color: var(--font-neutral-black);\r
}\r
.lq-tag-input__role:focus-visible {\r
  outline: 2px solid var(--stroke-primary-pressed);\r
  outline-offset: 1px;\r
  border-radius: 2px;\r
}\r
\r
/* Keyboard-highlighted result. .lq-col-share-option:hover already covers the\r
   pointer; this is the same treatment driven by the arrow keys. */\r
.lq-col-share-option--active {\r
  background: var(--bg-primary-lightest);\r
  outline: 1px solid var(--stroke-primary-light);\r
}\r
\r
/* "(you)" marker \u2014 its own element beside the name, never folded into it, so\r
   it stays out of avatar initials and out of interpolated messages. Mirrors\r
   agent-builder's ab-edit-access-user. */\r
.lq-col-share-member-you {\r
  color: var(--font-neutral-muted);\r
  font-weight: 400;\r
}\r
\r
/* \u2500\u2500 Access list rows \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\r
   Shaped after agent-builder's ab-edit-access-user: avatar, then a two-line\r
   block (name over email), then the role. */\r
.lq-col-share-member-info {\r
  flex: 1;\r
  min-width: 0;\r
  display: flex;\r
  flex-direction: column;\r
}\r
\r
.lq-col-share-member-email {\r
  font-size: var(--text-p-sm-regular-size);\r
  line-height: var(--text-p-sm-regular-line-height);\r
  color: var(--font-neutral-muted);\r
  white-space: nowrap;\r
  overflow: hidden;\r
  text-overflow: ellipsis;\r
}\r
\r
/* The role next to a row that has no menu (the creator, and your own row):\r
   same crown/eye + label as the button it stands in for. */\r
.lq-col-share-member-perm-label {\r
  display: inline-flex;\r
  align-items: center;\r
  gap: var(--space-3xs);\r
}\r
\r
/* injectIcons() swaps <i data-icon> for the raw <svg>, so size the svg. */\r
.lq-col-share-member-perm-label svg,\r
.lq-col-share-member-perm-btn svg {\r
  width: 14px;\r
  height: 14px;\r
  flex-shrink: 0;\r
}\r
\r
.lq-col-share-access-count {\r
  margin: 0;\r
  font-size: var(--text-p-sm-regular-size);\r
  line-height: var(--text-p-sm-regular-line-height);\r
  color: var(--font-neutral-muted);\r
}\r
\r
/* Stable wrapper for the role button's crown/eye \u2014 injectIcons() replaces the\r
   <i> it contains, so the marker can't live on the icon element itself. */\r
.lq-col-share-perm-icon {\r
  display: inline-flex;\r
  align-items: center;\r
}\r
.lq-col-share-perm-icon svg {\r
  width: 14px;\r
  height: 14px;\r
}\r
.oc-list-item-left > svg {\r
  width: 14px;\r
  height: 14px;\r
  flex-shrink: 0;\r
}\r
`;function gt(){if(typeof CSSStyleSheet>`u`||!(`adoptedStyleSheets`in Document.prototype))return null;let r=new CSSStyleSheet;return r.replaceSync(vr),r}var pn=gt();function Le(r){if(pn)r.adoptedStyleSheets=[...r.adoptedStyleSheets||[],pn];else{let e=document.createElement(`style`);e.textContent=vr,r.appendChild(e)}}var ht={"bookmark-plus-reg":`<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.1998 1.40039C3.42762 1.40039 2.7998 2.0282 2.7998 2.80039V11.9245C2.7998 12.4845 3.42324 12.817 3.88918 12.5063L6.9998 10.4304L10.1104 12.5063C10.5764 12.817 11.1998 12.4823 11.1998 11.9245V2.80039C11.1998 2.0282 10.572 1.40039 9.7998 1.40039H4.1998ZM3.8498 2.80039C3.8498 2.60789 4.0073 2.45039 4.1998 2.45039H9.7998C9.9923 2.45039 10.1498 2.60789 10.1498 2.80039V11.2704L7.58168 9.55977C7.22949 9.3257 6.77012 9.3257 6.41793 9.55977L3.8498 11.2704V2.80039ZM6.9998 3.85039C6.70887 3.85039 6.4748 4.08445 6.4748 4.37539V5.42539H5.4248C5.13387 5.42539 4.8998 5.65945 4.8998 5.95039C4.8998 6.24133 5.13387 6.47539 5.4248 6.47539H6.4748V7.52539C6.4748 7.81633 6.70887 8.05039 6.9998 8.05039C7.29074 8.05039 7.5248 7.81633 7.5248 7.52539V6.47539H8.5748C8.86574 6.47539 9.0998 6.24133 9.0998 5.95039C9.0998 5.65945 8.86574 5.42539 8.5748 5.42539H7.5248V4.37539C7.5248 4.08445 7.29074 3.85039 6.9998 3.85039Z" fill="currentColor"/>
</svg>`,"btn-add":`<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
  <path d="M7 2.5V11.5M2.5 7H11.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
</svg>`,"btn-check":`<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
  <path d="M11.681 2.89926C11.9172 3.06769 11.9697 3.39582 11.8013 3.63207L6.02629 11.6821C5.9366 11.8068 5.7966 11.8877 5.64348 11.8986C5.49035 11.9096 5.33723 11.8571 5.22785 11.7477L2.25285 8.77269C2.04723 8.56707 2.04723 8.23457 2.25285 8.03113C2.45848 7.82769 2.79098 7.82551 2.99441 8.03113L5.5341 10.5664L10.9482 3.01957C11.1166 2.78332 11.4447 2.73082 11.681 2.89926Z" fill="currentColor"/>
</svg>`,"checkbox-check":`<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 10 10" fill="currentColor">
  <path d="M8.5 2L4 7.5 1.5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
</svg>`,"checkbox-minus":`<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 12 12" fill="currentColor">
  <path d="M2 6h8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/>
</svg>`,"chevron-down":`<svg class="lq-chevron" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
  <path d="M7.3828 9.47186C7.17718 9.67749 6.84468 9.67749 6.64124 9.47186L3.13905 5.97186C2.93343 5.76624 2.93343 5.43374 3.13905 5.2303C3.34468 5.02686 3.67718 5.02467 3.88061 5.2303L7.00874 8.35842L10.1369 5.2303C10.3425 5.02467 10.675 5.02467 10.8784 5.2303C11.0819 5.43592 11.0841 5.76842 10.8784 5.97186L7.37843 9.47186H7.3828Z" fill="currentColor"/>
</svg>`,"chevron-left":`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
  <path d="M5.51409 7.56885C5.27307 7.80735 5.27307 8.193 5.51409 8.42896L9.61668 12.4884C9.8577 12.7269 10.2475 12.7269 10.4859 12.4884C10.7244 12.25 10.7269 11.8643 10.4859 11.6283L6.81924 8.00018L10.4859 4.37201C10.7269 4.13351 10.7269 3.74786 10.4859 3.51191C10.2449 3.27595 9.85514 3.27341 9.61668 3.51191L5.51409 7.56885Z" fill="currentColor"/>
</svg>`,"chevron-right":`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
  <path d="M10.4859 7.56885C10.7269 7.80735 10.7269 8.193 10.4859 8.42896L6.38332 12.4884C6.1423 12.7269 5.75255 12.7269 5.51409 12.4884C5.27563 12.25 5.27307 11.8643 5.51409 11.6283L9.18076 8.00018L5.51409 4.37201C5.27307 4.13351 5.27307 3.74786 5.51409 3.51191C5.75512 3.27595 6.14486 3.27341 6.38332 3.51191L10.4859 7.56885Z" fill="currentColor"/>
</svg>`,"chevron-up":`<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.62153 4.84792C6.83021 4.63924 7.16766 4.63924 7.37412 4.84792L10.9262 8.39997C11.1349 8.60865 11.1349 8.9461 10.9262 9.15256C10.7175 9.35902 10.38 9.36124 10.1736 9.15256L6.99893 5.97791L3.82429 9.15256C3.6156 9.36124 3.27816 9.36124 3.0717 9.15256C2.86523 8.94388 2.86301 8.60643 3.0717 8.39997L6.62375 4.84792H6.62153Z" fill="currentColor"/></svg>`,crown:`<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z"/>
  <path d="M5 21h14"/>
</svg>`,eye:`<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/>
  <circle cx="12" cy="12" r="3"/>
</svg>`,"chip-close":`<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
  <path d="M2.96403 3.69656L6.26707 7.00003L2.96403 10.303C2.74553 10.5215 2.74553 10.8775 2.96403 11.096C3.18253 11.3145 3.53853 11.3145 3.75703 11.096L7.06007 7.79253L10.3631 11.096C10.5816 11.3145 10.9376 11.3145 11.1561 11.096C11.3746 10.8775 11.3746 10.5215 11.1561 10.303L7.85307 7.00003L11.1561 3.69656C11.3746 3.47806 11.3746 3.12206 11.1561 2.90356C10.9376 2.68506 10.5816 2.68506 10.3631 2.90356L7.06007 6.20703L3.75703 2.90356C3.53853 2.68506 3.18253 2.68506 2.96403 2.90356C2.74553 3.12206 2.74553 3.47806 2.96403 3.69656Z" fill="currentColor"/>
</svg>`,"col-arrow-left":`<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.3536 3.64645C10.5488 3.84171 10.5488 4.15829 10.3536 4.35355L6.70711 8L10.3536 11.6464C10.5488 11.8417 10.5488 12.1583 10.3536 12.3536C10.1583 12.5488 9.84171 12.5488 9.64645 12.3536L5.64645 8.35355C5.45118 8.15829 5.45118 7.84171 5.64645 7.64645L9.64645 3.64645C9.84171 3.45118 10.1583 3.45118 10.3536 3.64645Z" fill="currentColor"/></svg>`,"col-doc-csv":`<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg"><g opacity="0.8"><rect width="36" height="36" rx="8" fill="#E5EEE3"/><path d="M14.4234 9.75182H10.3358C10.0146 9.75182 9.75182 10.0146 9.75182 10.3358V24.3504C9.75182 24.6715 10.0146 24.9343 10.3358 24.9343H13.2555V26.6861H10.3358C9.04745 26.6861 8 25.6387 8 24.3504V10.3358C8 9.04745 9.04745 8 10.3358 8H15.208C15.8285 8 16.4234 8.24453 16.8613 8.68248L21.3321 13.1569C21.7701 13.5949 22.0146 14.1898 22.0146 14.8102V20.2664H20.2628V15.5949H17.0511C15.5985 15.5949 14.4234 14.4197 14.4234 12.9672V9.75547V9.75182ZM19.5365 13.8394L16.1752 10.4781V12.9635C16.1752 13.4489 16.5657 13.8394 17.0511 13.8394H19.5365ZM16.4672 21.8686H17.0511C17.938 21.8686 18.6569 22.5876 18.6569 23.4745V23.7664C18.6569 24.1679 18.3285 24.4963 17.927 24.4963C17.5255 24.4963 17.1971 24.1679 17.1971 23.7664V23.4745C17.1971 23.3942 17.1314 23.3285 17.0511 23.3285H16.4672C16.3869 23.3285 16.3212 23.3942 16.3212 23.4745V26.3942C16.3212 26.4745 16.3869 26.5401 16.4672 26.5401H17.0511C17.1314 26.5401 17.1971 26.4745 17.1971 26.3942V26.1022C17.1971 25.7007 17.5255 25.3723 17.927 25.3723C18.3285 25.3723 18.6569 25.7007 18.6569 26.1022V26.3942C18.6569 27.281 17.938 28 17.0511 28H16.4672C15.5803 28 14.8613 27.281 14.8613 26.3942V23.4745C14.8613 22.5876 15.5803 21.8686 16.4672 21.8686ZM21.4307 21.8686H22.3066C22.708 21.8686 23.0365 22.1971 23.0365 22.5985C23.0365 23 22.708 23.3285 22.3066 23.3285H21.4307C21.1898 23.3285 20.9927 23.5255 20.9927 23.7664C20.9927 24.0073 21.1898 24.2044 21.4307 24.2044C22.4781 24.2044 23.3285 25.0547 23.3285 26.1022C23.3285 27.1496 22.4781 28 21.4307 28H20.2628C19.8613 28 19.5328 27.6715 19.5328 27.2701C19.5328 26.8686 19.8613 26.5401 20.2628 26.5401H21.4307C21.6715 26.5401 21.8686 26.3431 21.8686 26.1022C21.8686 25.8613 21.6715 25.6642 21.4307 25.6642C20.3832 25.6642 19.5328 24.8139 19.5328 23.7664C19.5328 22.719 20.3832 21.8686 21.4307 21.8686ZM24.9343 21.8686C25.3358 21.8686 25.6642 22.1971 25.6642 22.5985V23.7518C25.6642 24.4672 25.8139 25.1715 26.1022 25.8212C26.3905 25.1715 26.5401 24.4672 26.5401 23.7518V22.5985C26.5401 22.1971 26.8686 21.8686 27.2701 21.8686C27.6715 21.8686 28 22.1971 28 22.5985V23.7518C28 25.0474 27.6168 26.3175 26.8978 27.3942L26.7117 27.6752C26.5766 27.8796 26.3467 28 26.1058 28C25.865 28 25.635 27.8796 25.5 27.6752L25.3139 27.3942C24.5949 26.3139 24.2117 25.0474 24.2117 23.7518V22.5985C24.2117 22.1971 24.5401 21.8686 24.9416 21.8686H24.9343Z" fill="#3E6936"/></g></svg>`,"col-doc-doc":`<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg"><g opacity="0.8"><rect width="36" height="36" rx="8" fill="#E2EDF4"/><path d="M14.4234 9.75182H10.3358C10.0146 9.75182 9.75182 10.0146 9.75182 10.3358V24.3504C9.75182 24.6715 10.0146 24.9343 10.3358 24.9343H13.2555V26.6861H10.3358C9.04745 26.6861 8 25.6387 8 24.3504V10.3358C8 9.04745 9.04745 8 10.3358 8H15.208C15.8285 8 16.4234 8.24453 16.8613 8.68248L21.3321 13.1569C21.7701 13.5949 22.0146 14.1898 22.0146 14.8102V20.2664H20.2628V15.5949H17.0511C15.5985 15.5949 14.4234 14.4197 14.4234 12.9672V9.75547V9.75182ZM19.5365 13.8394L16.1752 10.4781V12.9635C16.1752 13.4489 16.5657 13.8394 17.0511 13.8394H19.5365ZM15.5912 21.8686H16.7591C17.8066 21.8686 18.6569 22.719 18.6569 23.7664V26.1022C18.6569 27.1496 17.8066 28 16.7591 28H15.5912C15.1898 28 14.8613 27.6715 14.8613 27.2701V22.5985C14.8613 22.1971 15.1898 21.8686 15.5912 21.8686ZM16.7591 26.5401C17 26.5401 17.1971 26.3431 17.1971 26.1022V23.7664C17.1971 23.5255 17 23.3285 16.7591 23.3285H16.3212V26.5401H16.7591ZM21.1387 21.8686H21.7226C22.6095 21.8686 23.3285 22.5876 23.3285 23.4745V26.3942C23.3285 27.281 22.6095 28 21.7226 28H21.1387C20.2518 28 19.5328 27.281 19.5328 26.3942V23.4745C19.5328 22.5876 20.2518 21.8686 21.1387 21.8686ZM20.9927 23.4745V26.3942C20.9927 26.4745 21.0584 26.5401 21.1387 26.5401H21.7226C21.8029 26.5401 21.8686 26.4745 21.8686 26.3942V23.4745C21.8686 23.3942 21.8029 23.3285 21.7226 23.3285H21.1387C21.0584 23.3285 20.9927 23.3942 20.9927 23.4745ZM24.2044 23.4745C24.2044 22.5876 24.9234 21.8686 25.8102 21.8686H26.3942C27.281 21.8686 28 22.5876 28 23.4745V23.7664C28 24.1679 27.6715 24.4963 27.2701 24.4963C26.8686 24.4963 26.5401 24.1679 26.5401 23.7664V23.4745C26.5401 23.3942 26.4745 23.3285 26.3942 23.3285H25.8102C25.7299 23.3285 25.6642 23.3942 25.6642 23.4745V26.3942C25.6642 26.4745 25.7299 26.5401 25.8102 26.5401H26.3942C26.4745 26.5401 26.5401 26.4745 26.5401 26.3942V26.1022C26.5401 25.7007 26.8686 25.3723 27.2701 25.3723C27.6715 25.3723 28 25.7007 28 26.1022V26.3942C28 27.281 27.281 28 26.3942 28H25.8102C24.9234 28 24.2044 27.281 24.2044 26.3942V23.4745Z" fill="#45677E"/></g></svg>`,"col-doc-pdf":`<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg"><g opacity="0.8"><rect width="36" height="36" rx="8" fill="#FFDEDF"/><path d="M14.6165 9.75182H10.406C10.0752 9.75182 9.80451 10.0146 9.80451 10.3358V24.3504C9.80451 24.6715 10.0752 24.9343 10.406 24.9343H13.4135V26.6861H10.406C9.07895 26.6861 8 25.6387 8 24.3504V10.3358C8 9.04745 9.07895 8 10.406 8H15.4248C16.0639 8 16.6767 8.24453 17.1278 8.68248L21.7331 13.1569C22.1842 13.5949 22.4361 14.1898 22.4361 14.8102V20.2664H20.6316V15.5949H17.3233C15.8271 15.5949 14.6165 14.4197 14.6165 12.9672V9.75547V9.75182ZM19.8835 13.8394L16.4211 10.4781V12.9635C16.4211 13.4489 16.8233 13.8394 17.3233 13.8394H19.8835ZM15.8195 21.8686H17.0226C18.2669 21.8686 19.2782 22.8504 19.2782 24.0584C19.2782 25.2664 18.2669 26.2482 17.0226 26.2482H16.5714V27.2701C16.5714 27.6715 16.2331 28 15.8195 28C15.406 28 15.0677 27.6715 15.0677 27.2701V22.5985C15.0677 22.1971 15.406 21.8686 15.8195 21.8686ZM17.0226 24.7883C17.4361 24.7883 17.7744 24.4599 17.7744 24.0584C17.7744 23.6569 17.4361 23.3285 17.0226 23.3285H16.5714V24.7883H17.0226ZM20.6316 21.8686H21.8346C22.9135 21.8686 23.7895 22.719 23.7895 23.7664V26.1022C23.7895 27.1496 22.9135 28 21.8346 28H20.6316C20.218 28 19.8797 27.6715 19.8797 27.2701V22.5985C19.8797 22.1971 20.218 21.8686 20.6316 21.8686ZM21.8346 26.5401C22.0827 26.5401 22.2857 26.3431 22.2857 26.1022V23.7664C22.2857 23.5255 22.0827 23.3285 21.8346 23.3285H21.3835V26.5401H21.8346ZM24.6917 22.5985C24.6917 22.1971 25.0301 21.8686 25.4436 21.8686H27.2481C27.6617 21.8686 28 22.1971 28 22.5985C28 23 27.6617 23.3285 27.2481 23.3285H26.1955V24.2044H27.2481C27.6617 24.2044 28 24.5328 28 24.9343C28 25.3358 27.6617 25.6642 27.2481 25.6642H26.1955V27.2701C26.1955 27.6715 25.8571 28 25.4436 28C25.0301 28 24.6917 27.6715 24.6917 27.2701V22.5985Z" fill="#AD3739"/></g></svg>`,"col-file":`<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.79995 2.79961H7.59995V4.99961C7.59995 5.99461 8.40495 6.79961 9.39995 6.79961H11.6V12.7996C11.6 13.0196 11.42 13.1996 11.2 13.1996H4.79995C4.57995 13.1996 4.39995 13.0196 4.39995 12.7996V3.19961C4.39995 2.97961 4.57995 2.79961 4.79995 2.79961ZM8.79995 3.29711L11.1025 5.59961H9.39995C9.06745 5.59961 8.79995 5.33211 8.79995 4.99961V3.29711ZM4.79995 1.59961C3.91745 1.59961 3.19995 2.31711 3.19995 3.19961V12.7996C3.19995 13.6821 3.91745 14.3996 4.79995 14.3996H11.2C12.0825 14.3996 12.8 13.6821 12.8 12.7996V6.26211C12.8 5.83711 12.6325 5.42961 12.3324 5.12961L9.26745 2.06711C8.96745 1.76711 8.56245 1.59961 8.13745 1.59961H4.79995ZM6.19995 7.99961C5.86745 7.99961 5.59995 8.26711 5.59995 8.59961C5.59995 8.93211 5.86745 9.19961 6.19995 9.19961H9.79995C10.1325 9.19961 10.4 8.93211 10.4 8.59961C10.4 8.26711 10.1325 7.99961 9.79995 7.99961H6.19995ZM6.19995 10.3996C5.86745 10.3996 5.59995 10.6671 5.59995 10.9996C5.59995 11.3321 5.86745 11.5996 6.19995 11.5996H9.79995C10.1325 11.5996 10.4 11.3321 10.4 10.9996C10.4 10.6671 10.1325 10.3996 9.79995 10.3996H6.19995Z" fill="currentColor"/></svg>`,"col-folder":`<svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg"><g opacity="0.8"><rect width="38" height="38" rx="12" fill="#FDF2DC"/><path d="M11.2 24.8504H26.8C27.1575 24.8504 27.45 24.5579 27.45 24.2004V14.4504C27.45 14.0929 27.1575 13.8004 26.8 13.8004H20.7347C20.0319 13.8004 19.3453 13.5729 18.7847 13.1504L17.2247 11.9804C17.1109 11.8951 16.9769 11.8504 16.8347 11.8504H11.2C10.8425 11.8504 10.55 12.1429 10.55 12.5004V24.2004C10.55 24.5579 10.8425 24.8504 11.2 24.8504ZM26.8 26.8004H11.2C9.76591 26.8004 8.59998 25.6345 8.59998 24.2004V12.5004C8.59998 11.0663 9.76591 9.90039 11.2 9.90039H16.8347C17.3953 9.90039 17.9437 10.0832 18.3947 10.4204L19.9547 11.5904C20.1781 11.761 20.4544 11.8504 20.7347 11.8504H26.8C28.234 11.8504 29.4 13.0163 29.4 14.4504V24.2004C29.4 25.6345 28.234 26.8004 26.8 26.8004Z" fill="#F6CA72"/></g></svg>`,"col-folder-blue":`<svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg"><g opacity="0.8"><rect width="38" height="38" rx="12" fill="#E2EDF4"/><path d="M11.2 24.8504H26.8C27.1575 24.8504 27.45 24.5579 27.45 24.2004V14.4504C27.45 14.0929 27.1575 13.8004 26.8 13.8004H20.7347C20.0319 13.8004 19.3453 13.5729 18.7847 13.1504L17.2247 11.9804C17.1109 11.8951 16.9769 11.8504 16.8347 11.8504H11.2C10.8425 11.8504 10.55 12.1429 10.55 12.5004V24.2004C10.55 24.5579 10.8425 24.8504 11.2 24.8504ZM26.8 26.8004H11.2C9.76591 26.8004 8.59998 25.6345 8.59998 24.2004V12.5004C8.59998 11.0663 9.76591 9.90039 11.2 9.90039H16.8347C17.3953 9.90039 17.9437 10.0832 18.3947 10.4204L19.9547 11.5904C20.1781 11.761 20.4544 11.8504 20.7347 11.8504H26.8C28.234 11.8504 29.4 13.0163 29.4 14.4504V24.2004C29.4 25.6345 28.234 26.8004 26.8 26.8004Z" fill="#8CB8D5"/></g></svg>`,"col-folder-green":`<svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg"><g opacity="0.8"><rect width="38" height="38" rx="12" fill="#E5EEE3"/><path d="M11.2 24.8504H26.8C27.1575 24.8504 27.45 24.5579 27.45 24.2004V14.4504C27.45 14.0929 27.1575 13.8004 26.8 13.8004H20.7347C20.0319 13.8004 19.3453 13.5729 18.7847 13.1504L17.2247 11.9804C17.1109 11.8951 16.9769 11.8504 16.8347 11.8504H11.2C10.8425 11.8504 10.55 12.1429 10.55 12.5004V24.2004C10.55 24.5579 10.8425 24.8504 11.2 24.8504ZM26.8 26.8004H11.2C9.76591 26.8004 8.59998 25.6345 8.59998 24.2004V12.5004C8.59998 11.0663 9.76591 9.90039 11.2 9.90039H16.8347C17.3953 9.90039 17.9437 10.0832 18.3947 10.4204L19.9547 11.5904C20.1781 11.761 20.4544 11.8504 20.7347 11.8504H26.8C28.234 11.8504 29.4 13.0163 29.4 14.4504V24.2004C29.4 25.6345 28.234 26.8004 26.8 26.8004Z" fill="#709B67"/></g></svg>`,"col-folder-indigo":`<svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg"><g opacity="0.8"><rect width="38" height="38" rx="12" fill="#E5E9F9"/><path d="M11.2 24.8504H26.8C27.1575 24.8504 27.45 24.5579 27.45 24.2004V14.4504C27.45 14.0929 27.1575 13.8004 26.8 13.8004H20.7347C20.0319 13.8004 19.3453 13.5729 18.7847 13.1504L17.2247 11.9804C17.1109 11.8951 16.9769 11.8504 16.8347 11.8504H11.2C10.8425 11.8504 10.55 12.1429 10.55 12.5004V24.2004C10.55 24.5579 10.8425 24.8504 11.2 24.8504ZM26.8 26.8004H11.2C9.76591 26.8004 8.59998 25.6345 8.59998 24.2004V12.5004C8.59998 11.0663 9.76591 9.90039 11.2 9.90039H16.8347C17.3953 9.90039 17.9437 10.0832 18.3947 10.4204L19.9547 11.5904C20.1781 11.761 20.4544 11.8504 20.7347 11.8504H26.8C28.234 11.8504 29.4 13.0163 29.4 14.4504V24.2004C29.4 25.6345 28.234 26.8004 26.8 26.8004Z" fill="#98A9E5"/></g></svg>`,"col-folder-orange":`<svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg"><g opacity="0.8"><rect width="38" height="38" rx="12" fill="#FFEEE2"/><path d="M11.2 24.8504H26.8C27.1575 24.8504 27.45 24.5579 27.45 24.2004V14.4504C27.45 14.0929 27.1575 13.8004 26.8 13.8004H20.7347C20.0319 13.8004 19.3453 13.5729 18.7847 13.1504L17.2247 11.9804C17.1109 11.8951 16.9769 11.8504 16.8347 11.8504H11.2C10.8425 11.8504 10.55 12.1429 10.55 12.5004V24.2004C10.55 24.5579 10.8425 24.8504 11.2 24.8504ZM26.8 26.8004H11.2C9.76591 26.8004 8.59998 25.6345 8.59998 24.2004V12.5004C8.59998 11.0663 9.76591 9.90039 11.2 9.90039H16.8347C17.3953 9.90039 17.9437 10.0832 18.3947 10.4204L19.9547 11.5904C20.1781 11.761 20.4544 11.8504 20.7347 11.8504H26.8C28.234 11.8504 29.4 13.0163 29.4 14.4504V24.2004C29.4 25.6345 28.234 26.8004 26.8 26.8004Z" fill="#FFBA8D"/></g></svg>`,"col-folder-pink":`<svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg"><g opacity="0.8"><rect width="38" height="38" rx="12" fill="#FAECFB"/><path d="M11.2 24.8504H26.8C27.1575 24.8504 27.45 24.5579 27.45 24.2004V14.4504C27.45 14.0929 27.1575 13.8004 26.8 13.8004H20.7347C20.0319 13.8004 19.3453 13.5729 18.7847 13.1504L17.2247 11.9804C17.1109 11.8951 16.9769 11.8504 16.8347 11.8504H11.2C10.8425 11.8504 10.55 12.1429 10.55 12.5004V24.2004C10.55 24.5579 10.8425 24.8504 11.2 24.8504ZM26.8 26.8004H11.2C9.76591 26.8004 8.59998 25.6345 8.59998 24.2004V12.5004C8.59998 11.0663 9.76591 9.90039 11.2 9.90039H16.8347C17.3953 9.90039 17.9437 10.0832 18.3947 10.4204L19.9547 11.5904C20.1781 11.761 20.4544 11.8504 20.7347 11.8504H26.8C28.234 11.8504 29.4 13.0163 29.4 14.4504V24.2004C29.4 25.6345 28.234 26.8004 26.8 26.8004Z" fill="#C9AACB"/></g></svg>`,"col-folder-teal":`<svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg"><g opacity="0.8"><rect width="38" height="38" rx="12" fill="#E0F4F1"/><path d="M11.2 24.8504H26.8C27.1575 24.8504 27.45 24.5579 27.45 24.2004V14.4504C27.45 14.0929 27.1575 13.8004 26.8 13.8004H20.7347C20.0319 13.8004 19.3453 13.5729 18.7847 13.1504L17.2247 11.9804C17.1109 11.8951 16.9769 11.8504 16.8347 11.8504H11.2C10.8425 11.8504 10.55 12.1429 10.55 12.5004V24.2004C10.55 24.5579 10.8425 24.8504 11.2 24.8504ZM26.8 26.8004H11.2C9.76591 26.8004 8.59998 25.6345 8.59998 24.2004V12.5004C8.59998 11.0663 9.76591 9.90039 11.2 9.90039H16.8347C17.3953 9.90039 17.9437 10.0832 18.3947 10.4204L19.9547 11.5904C20.1781 11.761 20.4544 11.8504 20.7347 11.8504H26.8C28.234 11.8504 29.4 13.0163 29.4 14.4504V24.2004C29.4 25.6345 28.234 26.8004 26.8 26.8004Z" fill="#4EBFB0"/></g></svg>`,"col-grid":`<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.14998 3.14961V5.24961H5.24998V3.14961H3.14998ZM2.09998 3.14961C2.09998 2.56992 2.57029 2.09961 3.14998 2.09961H5.24998C5.82966 2.09961 6.29998 2.56992 6.29998 3.14961V5.24961C6.29998 5.8293 5.82966 6.29961 5.24998 6.29961H3.14998C2.57029 6.29961 2.09998 5.8293 2.09998 5.24961V3.14961ZM3.14998 8.74961V10.8496H5.24998V8.74961H3.14998ZM2.09998 8.74961C2.09998 8.16992 2.57029 7.69961 3.14998 7.69961H5.24998C5.82966 7.69961 6.29998 8.16992 6.29998 8.74961V10.8496C6.29998 11.4293 5.82966 11.8996 5.24998 11.8996H3.14998C2.57029 11.8996 2.09998 11.4293 2.09998 10.8496V8.74961ZM10.85 3.14961H8.74997V5.24961H10.85V3.14961ZM8.74997 2.09961H10.85C11.4297 2.09961 11.9 2.56992 11.9 3.14961V5.24961C11.9 5.8293 11.4297 6.29961 10.85 6.29961H8.74997C8.17029 6.29961 7.69998 5.8293 7.69998 5.24961V3.14961C7.69998 2.56992 8.17029 2.09961 8.74997 2.09961ZM8.74997 8.74961V10.8496H10.85V8.74961H8.74997ZM7.69998 8.74961C7.69998 8.16992 8.17029 7.69961 8.74997 7.69961H10.85C11.4297 7.69961 11.9 8.16992 11.9 8.74961V10.8496C11.9 11.4293 11.4297 11.8996 10.85 11.8996H8.74997C8.17029 11.8996 7.69998 11.4293 7.69998 10.8496V8.74961Z" fill="currentColor"/></svg>`,"col-list":`<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.39998 3.2002C1.95748 3.2002 1.59998 3.5577 1.59998 4.0002C1.59998 4.4427 1.95748 4.8002 2.39998 4.8002C2.84248 4.8002 3.19998 4.4427 3.19998 4.0002C3.19998 3.5577 2.84248 3.2002 2.39998 3.2002ZM5.39998 3.2002C5.06748 3.2002 4.79998 3.4677 4.79998 3.8002C4.79998 4.1327 5.06748 4.4002 5.39998 4.4002H13.8C14.1325 4.4002 14.4 4.1327 14.4 3.8002C14.4 3.4677 14.1325 3.2002 13.8 3.2002H5.39998ZM5.39998 7.4002C5.06748 7.4002 4.79998 7.6677 4.79998 8.0002C4.79998 8.3327 5.06748 8.60019 5.39998 8.60019H13.8C14.1325 8.60019 14.4 8.3327 14.4 8.0002C14.4 7.6677 14.1325 7.4002 13.8 7.4002H5.39998ZM5.39998 11.6002C5.06748 11.6002 4.79998 11.8677 4.79998 12.2002C4.79998 12.5327 5.06748 12.8002 5.39998 12.8002H13.8C14.1325 12.8002 14.4 12.5327 14.4 12.2002C14.4 11.8677 14.1325 11.6002 13.8 11.6002H5.39998ZM3.19998 8.0002C3.19998 7.5577 2.84248 7.2002 2.39998 7.2002C1.95748 7.2002 1.59998 7.5577 1.59998 8.0002C1.59998 8.4427 1.95748 8.80019 2.39998 8.80019C2.84248 8.80019 3.19998 8.4427 3.19998 8.0002ZM2.39998 11.2002C1.95748 11.2002 1.59998 11.5577 1.59998 12.0002C1.59998 12.4427 1.95748 12.8002 2.39998 12.8002C2.84248 12.8002 3.19998 12.4427 3.19998 12.0002C3.19998 11.5577 2.84248 11.2002 2.39998 11.2002Z" fill="currentColor"/></svg>`,"col-people":`<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.00005 6.79998C7.10505 6.79998 8.00005 5.90498 8.00005 4.79998C8.00005 3.69498 7.10505 2.79998 6.00005 2.79998C4.89505 2.79998 4.00005 3.69498 4.00005 4.79998C4.00005 5.90498 4.89505 6.79998 6.00005 6.79998ZM6.00005 1.59998C7.76755 1.59998 9.20005 3.03248 9.20005 4.79998C9.20005 6.56748 7.76755 7.99998 6.00005 7.99998C4.23255 7.99998 2.80005 6.56748 2.80005 4.79998C2.80005 3.03248 4.23255 1.59998 6.00005 1.59998ZM5.20005 10.4C3.43255 10.4 2.00005 11.8325 2.00005 13.6V13.8C2.00005 14.1325 1.73255 14.4 1.40005 14.4C1.06755 14.4 0.800049 14.1325 0.800049 13.8V13.6C0.800049 11.17 2.77005 9.19998 5.20005 9.19998H6.80005C9.23005 9.19998 11.2 11.17 11.2 13.6V13.8C11.2 14.1325 10.9325 14.4 10.6 14.4C10.2675 14.4 10 14.1325 10 13.8V13.6C10 11.8325 8.56755 10.4 6.80005 10.4H5.20005ZM9.38255 7.61498C9.63755 7.30748 9.85255 6.96498 10.0175 6.59748C10.2475 6.72748 10.515 6.80248 10.8 6.80248C11.6825 6.80248 12.4 6.08498 12.4 5.20248C12.4 4.31998 11.6825 3.60248 10.8 3.60248C10.61 3.60248 10.4275 3.63498 10.26 3.69498C10.1575 3.29998 10.0025 2.92748 9.80255 2.58498C10.1125 2.46748 10.45 2.40248 10.8 2.40248C12.3475 2.40248 13.6 3.65498 13.6 5.20248C13.6 6.74998 12.3475 7.99998 10.8 7.99998C10.2825 7.99998 9.79755 7.85998 9.38255 7.61498ZM11.6975 10.8825C11.435 10.41 11.105 9.97748 10.72 9.59998H11C13.32 9.59998 15.2 11.48 15.2 13.8C15.2 14.1325 14.9325 14.4 14.6 14.4C14.2675 14.4 14 14.1325 14 13.8C14 12.3825 13.0175 11.195 11.6975 10.8825Z" fill="currentColor"/></svg>`,"col-person":`<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.9999 4.79998C5.9999 3.69498 6.8949 2.79998 7.9999 2.79998C9.1049 2.79998 9.9999 3.69498 9.9999 4.79998C9.9999 5.90498 9.1049 6.79998 7.9999 6.79998C6.8949 6.79998 5.9999 5.90498 5.9999 4.79998ZM11.1999 4.79998C11.1999 3.03248 9.7674 1.59998 7.9999 1.59998C6.2324 1.59998 4.7999 3.03248 4.7999 4.79998C4.7999 6.56748 6.2324 7.99998 7.9999 7.99998C9.7674 7.99998 11.1999 6.56748 11.1999 4.79998ZM3.5999 13.6C3.5999 11.8325 5.0324 10.4 6.7999 10.4H9.1999C10.9674 10.4 12.3999 11.8325 12.3999 13.6V13.8C12.3999 14.1325 12.6674 14.4 12.9999 14.4C13.3324 14.4 13.5999 14.1325 13.5999 13.8V13.6C13.5999 11.17 11.6299 9.19998 9.1999 9.19998H6.7999C4.3699 9.19998 2.3999 11.17 2.3999 13.6V13.8C2.3999 14.1325 2.6674 14.4 2.9999 14.4C3.3324 14.4 3.5999 14.1325 3.5999 13.8V13.6Z" fill="currentColor"/></svg>`,"col-plus":`<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 2.09961C7.29094 2.09961 7.525 2.33367 7.525 2.62461V6.47461H11.375C11.6659 6.47461 11.9 6.70867 11.9 6.99961C11.9 7.29055 11.6659 7.52461 11.375 7.52461H7.525V11.3746C7.525 11.6656 7.29094 11.8996 7 11.8996C6.70906 11.8996 6.475 11.6656 6.475 11.3746V7.52461H2.625C2.33406 7.52461 2.1 7.29055 2.1 6.99961C2.1 6.70867 2.33406 6.47461 2.625 6.47461H6.475V2.62461C6.475 2.33367 6.70906 2.09961 7 2.09961Z" fill="currentColor"/></svg>`,"col-quick":`<svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg"><g opacity="0.8"><rect width="38" height="38" rx="12" fill="#EFF2F6"/><path d="M18.6177 26.28C17.3244 26.28 16.1777 25.98 15.1777 25.38C14.1911 24.78 13.4177 23.94 12.8577 22.86C12.3111 21.7667 12.0377 20.4933 12.0377 19.04C12.0377 17.5733 12.3111 16.3 12.8577 15.22C13.4177 14.1267 14.1911 13.28 15.1777 12.68C16.1644 12.08 17.3111 11.78 18.6177 11.78C19.9511 11.78 21.1111 12.08 22.0977 12.68C23.0977 13.28 23.8711 14.1267 24.4177 15.22C24.9777 16.3 25.2577 17.5733 25.2577 19.04C25.2577 20.4933 24.9777 21.7667 24.4177 22.86C23.8577 23.94 23.0777 24.78 22.0777 25.38C21.0911 25.98 19.9377 26.28 18.6177 26.28ZM24.5577 27.04L18.9577 21.62L20.2977 20.18L25.9377 25.7L24.5577 27.04ZM18.6177 24.08C19.5111 24.08 20.2777 23.8733 20.9177 23.46C21.5577 23.0467 22.0511 22.4667 22.3977 21.72C22.7577 20.96 22.9377 20.0667 22.9377 19.04C22.9377 18 22.7577 17.1067 22.3977 16.36C22.0511 15.6 21.5577 15.0133 20.9177 14.6C20.2777 14.1867 19.5111 13.98 18.6177 13.98C17.7511 13.98 16.9977 14.1867 16.3577 14.6C15.7177 15 15.2177 15.58 14.8577 16.34C14.5111 17.0867 14.3377 17.9867 14.3377 19.04C14.3377 20.08 14.5111 20.98 14.8577 21.74C15.2044 22.4867 15.6977 23.0667 16.3377 23.48C16.9911 23.88 17.7511 24.08 18.6177 24.08Z" fill="#7685A2"/></g></svg>`,"col-tags-label":`<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.20244 3.8C3.20244 3.4675 3.46994 3.2 3.80244 3.2H7.70494C7.86494 3.2 8.01744 3.2625 8.12994 3.375L13.3299 8.575C13.5649 8.81 13.5649 9.19 13.3299 9.4225L9.42744 13.3275C9.19244 13.5625 8.81244 13.5625 8.57994 13.3275L3.37994 8.1275C3.26744 8.015 3.20494 7.8625 3.20494 7.7025L3.20244 3.8ZM3.80244 2C2.80744 2 2.00244 2.805 2.00244 3.8V7.7025C2.00244 8.18 2.19244 8.6375 2.52994 8.975L7.72994 14.175C8.43244 14.8775 9.57244 14.8775 10.2749 14.175L14.1774 10.2725C14.8799 9.57 14.8799 8.43 14.1774 7.7275L8.97744 2.5275C8.63994 2.19 8.18244 2 7.70494 2H3.80244ZM5.20244 6C5.64494 6 6.00244 5.6425 6.00244 5.2C6.00244 4.7575 5.64494 4.4 5.20244 4.4C4.75994 4.4 4.40244 4.7575 4.40244 5.2C4.40244 5.6425 4.75994 6 5.20244 6Z" fill="#445556"/></svg>`,"col-trash":`<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.73572 1.0498C5.44479 1.0498 5.18228 1.23137 5.07947 1.5048L4.7251 2.4498H2.6251C2.33416 2.4498 2.1001 2.68387 2.1001 2.9748C2.1001 3.26574 2.33416 3.4998 2.6251 3.4998H11.3751C11.666 3.4998 11.9001 3.26574 11.9001 2.9748C11.9001 2.68387 11.666 2.4498 11.3751 2.4498H9.2751L8.92072 1.5048C8.81791 1.23137 8.5576 1.0498 8.26447 1.0498H5.73572ZM2.8001 4.5498V11.1998C2.8001 11.972 3.42791 12.5998 4.2001 12.5998H9.8001C10.5723 12.5998 11.2001 11.972 11.2001 11.1998V4.5498H10.1501V11.1998C10.1501 11.3923 9.9926 11.5498 9.8001 11.5498H4.2001C4.0076 11.5498 3.8501 11.3923 3.8501 11.1998V4.5498H2.8001ZM6.3001 6.1248C6.3001 5.83387 6.06603 5.5998 5.7751 5.5998C5.48416 5.5998 5.2501 5.83387 5.2501 6.1248V9.9748C5.2501 10.2657 5.48416 10.4998 5.7751 10.4998C6.06603 10.4998 6.3001 10.2657 6.3001 9.9748V6.1248ZM8.7501 6.1248C8.7501 5.83387 8.51603 5.5998 8.2251 5.5998C7.93416 5.5998 7.7001 5.83387 7.7001 6.1248V9.9748C7.7001 10.2657 7.93416 10.4998 8.2251 10.4998C8.51603 10.4998 8.7501 10.2657 8.7501 9.9748V6.1248Z" fill="currentColor"/></svg>`,"collapse-sidebar":`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
  <path d="M1.6001 3.79922C1.6001 3.46672 1.8676 3.19922 2.2001 3.19922C2.5326 3.19922 2.8001 3.46672 2.8001 3.79922V12.1992C2.8001 12.5317 2.5326 12.7992 2.2001 12.7992C1.8676 12.7992 1.6001 12.5317 1.6001 12.1992V3.79922ZM4.9751 8.42422C4.7401 8.18922 4.7401 7.80922 4.9751 7.57672L8.3751 4.17422C8.6101 3.93922 8.9901 3.93922 9.2226 4.17422C9.4551 4.40922 9.4576 4.78922 9.2226 5.02172L6.8476 7.39672H13.8001C14.1326 7.39672 14.4001 7.66422 14.4001 7.99672C14.4001 8.32922 14.1326 8.59672 13.8001 8.59672H6.8476L9.2226 10.9717C9.4576 11.2067 9.4576 11.5867 9.2226 11.8192C8.9876 12.0517 8.6076 12.0542 8.3751 11.8192L4.9751 8.42422Z" fill="currentColor"/>
</svg>`,"doc-csv":`<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M7.01979 3.12587H3.61346C3.34582 3.12587 3.12685 3.34485 3.12685 3.61249V15.2913C3.12685 15.559 3.34582 15.7779 3.61346 15.7779H6.04655V17.2378H3.61346C2.53986 17.2378 1.66699 16.3649 1.66699 15.2913V3.61249C1.66699 2.53889 2.53986 1.66602 3.61346 1.66602H7.67368C8.19071 1.66602 8.68646 1.86979 9.05142 2.23475L12.7771 5.96346C13.1421 6.32842 13.3458 6.82417 13.3458 7.3412V11.888H11.886V7.99509H9.20957C7.99911 7.99509 7.01979 7.01577 7.01979 5.80531V3.12891V3.12587ZM11.2807 6.5322L8.47964 3.7311V5.80227C8.47964 6.20677 8.80507 6.5322 9.20957 6.5322H11.2807ZM8.72295 13.2232H9.20957C9.94862 13.2232 10.5478 13.8223 10.5478 14.5614V14.8047C10.5478 15.1393 10.274 15.413 9.9395 15.413C9.60495 15.413 9.33123 15.1393 9.33123 14.8047V14.5614C9.33123 14.4945 9.27648 14.4397 9.20957 14.4397H8.72295C8.65604 14.4397 8.6013 14.4945 8.6013 14.5614V16.9945C8.6013 17.0614 8.65604 17.1161 8.72295 17.1161H9.20957C9.27648 17.1161 9.33123 17.0614 9.33123 16.9945V16.7512C9.33123 16.4166 9.60495 16.1429 9.9395 16.1429C10.274 16.1429 10.5478 16.4166 10.5478 16.7512V16.9945C10.5478 17.7335 9.94862 18.3327 9.20957 18.3327H8.72295C7.9839 18.3327 7.38475 17.7335 7.38475 16.9945V14.5614C7.38475 13.8223 7.9839 13.2232 8.72295 13.2232ZM12.8592 13.2232H13.5891C13.9237 13.2232 14.1974 13.4969 14.1974 13.8315C14.1974 14.166 13.9237 14.4397 13.5891 14.4397H12.8592C12.6585 14.4397 12.4942 14.604 12.4942 14.8047C12.4942 15.0054 12.6585 15.1697 12.8592 15.1697C13.7321 15.1697 14.4407 15.8783 14.4407 16.7512C14.4407 17.624 13.7321 18.3327 12.8592 18.3327H11.886C11.5514 18.3327 11.2777 18.059 11.2777 17.7244C11.2777 17.3899 11.5514 17.1161 11.886 17.1161H12.8592C13.0599 17.1161 13.2242 16.9519 13.2242 16.7512C13.2242 16.5504 13.0599 16.3862 12.8592 16.3862C11.9863 16.3862 11.2777 15.6776 11.2777 14.8047C11.2777 13.9318 11.9863 13.2232 12.8592 13.2232ZM15.7789 13.2232C16.1135 13.2232 16.3872 13.4969 16.3872 13.8315V14.7925C16.3872 15.3886 16.5119 15.9756 16.7521 16.517C16.9924 15.9756 17.1171 15.3886 17.1171 14.7925V13.8315C17.1171 13.4969 17.3908 13.2232 17.7254 13.2232C18.0599 13.2232 18.3337 13.4969 18.3337 13.8315V14.7925C18.3337 15.8722 18.0143 16.9306 17.4152 17.8278L17.2601 18.062C17.1475 18.2323 16.9559 18.3327 16.7552 18.3327C16.5545 18.3327 16.3629 18.2323 16.2503 18.062L16.0952 17.8278C15.4961 16.9276 15.1767 15.8722 15.1767 14.7925V13.8315C15.1767 13.4969 15.4504 13.2232 15.785 13.2232H15.7789Z" fill="currentColor"/>
</svg>`,"doc-doc":`<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M7.01979 3.12587H3.61346C3.34582 3.12587 3.12685 3.34485 3.12685 3.61249V15.2913C3.12685 15.559 3.34582 15.7779 3.61346 15.7779H6.04655V17.2378H3.61346C2.53986 17.2378 1.66699 16.3649 1.66699 15.2913V3.61249C1.66699 2.53889 2.53986 1.66602 3.61346 1.66602H7.67368C8.19071 1.66602 8.68646 1.86979 9.05142 2.23475L12.7771 5.96346C13.1421 6.32842 13.3458 6.82417 13.3458 7.3412V11.888H11.886V7.99509H9.20957C7.99911 7.99509 7.01979 7.01577 7.01979 5.80531V3.12891V3.12587ZM11.2807 6.5322L8.47964 3.7311V5.80227C8.47964 6.20677 8.80507 6.5322 9.20957 6.5322H11.2807ZM7.99303 13.2232H8.96626C9.83913 13.2232 10.5478 13.9318 10.5478 14.8047V16.7512C10.5478 17.624 9.83913 18.3327 8.96626 18.3327H7.99303C7.65848 18.3327 7.38475 18.059 7.38475 17.7244V13.8315C7.38475 13.4969 7.65848 13.2232 7.99303 13.2232ZM8.96626 17.1161C9.16699 17.1161 9.33123 16.9519 9.33123 16.7512V14.8047C9.33123 14.604 9.16699 14.4397 8.96626 14.4397H8.6013V17.1161H8.96626ZM12.6159 13.2232H13.1025C13.8416 13.2232 14.4407 13.8223 14.4407 14.5614V16.9945C14.4407 17.7335 13.8416 18.3327 13.1025 18.3327H12.6159C11.8768 18.3327 11.2777 17.7335 11.2777 16.9945V14.5614C11.2777 13.8223 11.8768 13.2232 12.6159 13.2232ZM12.4942 14.5614V16.9945C12.4942 17.0614 12.549 17.1161 12.6159 17.1161H13.1025C13.1694 17.1161 13.2242 17.0614 13.2242 16.9945V14.5614C13.2242 14.4945 13.1694 14.4397 13.1025 14.4397H12.6159C12.549 14.4397 12.4942 14.4945 12.4942 14.5614ZM15.1706 14.5614C15.1706 13.8223 15.7698 13.2232 16.5088 13.2232H16.9955C17.7345 13.2232 18.3337 13.8223 18.3337 14.5614V14.8047C18.3337 15.1393 18.0599 15.413 17.7254 15.413C17.3908 15.413 17.1171 15.1393 17.1171 14.8047V14.5614C17.1171 14.4945 17.0624 14.4397 16.9955 14.4397H16.5088C16.4419 14.4397 16.3872 14.4945 16.3872 14.5614V16.9945C16.3872 17.0614 16.4419 17.1161 16.5088 17.1161H16.9955C17.0624 17.1161 17.1171 17.0614 17.1171 16.9945V16.7512C17.1171 16.4166 17.3908 16.1429 17.7254 16.1429C18.0599 16.1429 18.3337 16.4166 18.3337 16.7512V16.9945C18.3337 17.7335 17.7345 18.3327 16.9955 18.3327H16.5088C15.7698 18.3327 15.1706 17.7335 15.1706 16.9945V14.5614Z" fill="currentColor"/>
</svg>`,"doc-pdf":`<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M7.18078 2.91977H3.672C3.39632 2.91977 3.17075 3.14534 3.17075 3.42103V15.4511C3.17075 15.7268 3.39632 15.9524 3.672 15.9524H6.17827V17.4561H3.672C2.56612 17.4561 1.66699 16.557 1.66699 15.4511V3.42103C1.66699 2.31514 2.56612 1.41602 3.672 1.41602H7.85434C8.38692 1.41602 8.89757 1.62592 9.27351 2.00186L13.1112 5.84271C13.4872 6.21865 13.6971 6.7293 13.6971 7.26188V11.9455H12.1933V7.93544H9.43642C8.18955 7.93544 7.18078 6.92667 7.18078 5.6798V2.92291V2.91977ZM11.5699 6.42855L8.68454 3.54321V5.67667C8.68454 6.09333 9.01975 6.42855 9.43642 6.42855H11.5699ZM8.18328 13.3208H9.18579C10.2228 13.3208 11.0655 14.1635 11.0655 15.2005C11.0655 16.2374 10.2228 17.0802 9.18579 17.0802H8.80985V17.9574C8.80985 18.302 8.52789 18.5839 8.18328 18.5839C7.83867 18.5839 7.55672 18.302 7.55672 17.9574V13.9473C7.55672 13.6027 7.83867 13.3208 8.18328 13.3208ZM9.18579 15.827C9.5304 15.827 9.81236 15.5451 9.81236 15.2005C9.81236 14.8559 9.5304 14.5739 9.18579 14.5739H8.80985V15.827H9.18579ZM12.1933 13.3208H13.1958C14.0949 13.3208 14.8249 14.0507 14.8249 14.9498V16.9549C14.8249 17.854 14.0949 18.5839 13.1958 18.5839H12.1933C11.8487 18.5839 11.5667 18.302 11.5667 17.9574V13.9473C11.5667 13.6027 11.8487 13.3208 12.1933 13.3208ZM13.1958 17.3308C13.4026 17.3308 13.5718 17.1616 13.5718 16.9549V14.9498C13.5718 14.7431 13.4026 14.5739 13.1958 14.5739H12.8199V17.3308H13.1958ZM15.5768 13.9473C15.5768 13.6027 15.8587 13.3208 16.2033 13.3208H17.7071C18.0517 13.3208 18.3337 13.6027 18.3337 13.9473C18.3337 14.292 18.0517 14.5739 17.7071 14.5739H16.8299V15.3258H17.7071C18.0517 15.3258 18.3337 15.6077 18.3337 15.9524C18.3337 16.297 18.0517 16.5789 17.7071 16.5789H16.8299V17.9574C16.8299 18.302 16.5479 18.5839 16.2033 18.5839C15.8587 18.5839 15.5768 18.302 15.5768 17.9574V13.9473Z" fill="currentColor"/>
</svg>`,"dp-chat":`<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
  <path d="M5.85633 12.6193L5.02945 13.2034C4.86977 13.3171 4.65977 13.3302 4.48477 13.2405C4.30977 13.1509 4.20039 12.9715 4.20039 12.7746V11.1996H3.50039C2.34102 11.1996 1.40039 10.259 1.40039 9.09961V4.19961C1.40039 3.04023 2.34102 2.09961 3.50039 2.09961H10.5004C11.6598 2.09961 12.6004 3.04023 12.6004 4.19961V9.09961C12.6004 10.259 11.6598 11.1996 10.5004 11.1996H7.86664L5.85633 12.6193ZM7.26289 10.3421C7.44008 10.2174 7.65227 10.1496 7.86883 10.1496H10.5004C11.0801 10.1496 11.5504 9.6793 11.5504 9.09961V4.19961C11.5504 3.61992 11.0801 3.14961 10.5004 3.14961H3.50039C2.9207 3.14961 2.45039 3.61992 2.45039 4.19961V9.09961C2.45039 9.6793 2.9207 10.1496 3.50039 10.1496H4.72539C4.95289 10.1496 5.14758 10.294 5.21977 10.4974C5.23945 10.5521 5.25039 10.6112 5.25039 10.6746V11.7618C5.9657 11.2565 6.63508 10.784 7.2607 10.3421H7.26289Z" fill="currentColor"/>
</svg>`,"edit-reg":`<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.0468 2.68891L11.3115 2.95359C11.5171 3.15922 11.5171 3.49172 11.3115 3.69516L10.6749 4.33391L9.66646 3.32547L10.303 2.68891C10.5087 2.48328 10.8412 2.48328 11.0446 2.68891H11.0468ZM5.98928 7.00484L8.9249 4.06703L9.93334 5.07547L6.99553 8.01109C6.93209 8.07453 6.85334 8.12047 6.76803 8.14453L5.48834 8.50984L5.85365 7.23016C5.87771 7.14484 5.92365 7.06609 5.98709 7.00266L5.98928 7.00484ZM9.56146 1.94734L5.24553 6.26109C5.05521 6.45141 4.9174 6.68547 4.84521 6.94141L4.21959 9.12891C4.16709 9.31266 4.2174 9.50953 4.35303 9.64516C4.48865 9.78078 4.68553 9.83109 4.86928 9.77859L7.05678 9.15297C7.3149 9.07859 7.54896 8.94078 7.73709 8.75266L12.053 4.43891C12.6677 3.82422 12.6677 2.82672 12.053 2.21203L11.7883 1.94734C11.1737 1.33266 10.1762 1.33266 9.56146 1.94734ZM3.3249 2.80047C2.26178 2.80047 1.3999 3.66234 1.3999 4.72547V10.6755C1.3999 11.7386 2.26178 12.6005 3.3249 12.6005H9.2749C10.338 12.6005 11.1999 11.7386 11.1999 10.6755V8.22547C11.1999 7.93453 10.9658 7.70047 10.6749 7.70047C10.384 7.70047 10.1499 7.93453 10.1499 8.22547V10.6755C10.1499 11.1589 9.75834 11.5505 9.2749 11.5505H3.3249C2.84146 11.5505 2.4499 11.1589 2.4499 10.6755V4.72547C2.4499 4.24203 2.84146 3.85047 3.3249 3.85047H5.7749C6.06584 3.85047 6.2999 3.61641 6.2999 3.32547C6.2999 3.03453 6.06584 2.80047 5.7749 2.80047H3.3249Z" fill="currentColor"/></svg>`,"ellipsis-reg":`<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.9001 6.99922C11.9001 7.57891 11.4298 8.04922 10.8501 8.04922C10.2704 8.04922 9.8001 7.57891 9.8001 6.99922C9.8001 6.41953 10.2704 5.94922 10.8501 5.94922C11.4298 5.94922 11.9001 6.41953 11.9001 6.99922ZM8.0501 6.99922C8.0501 7.57891 7.57978 8.04922 7.0001 8.04922C6.42041 8.04922 5.9501 7.57891 5.9501 6.99922C5.9501 6.41953 6.42041 5.94922 7.0001 5.94922C7.57978 5.94922 8.0501 6.41953 8.0501 6.99922ZM3.1501 8.04922C2.57041 8.04922 2.1001 7.57891 2.1001 6.99922C2.1001 6.41953 2.57041 5.94922 3.1501 5.94922C3.72978 5.94922 4.2001 6.41953 4.2001 6.99922C4.2001 7.57891 3.72978 8.04922 3.1501 8.04922Z" fill="currentColor"/>
</svg>`,"expand-sidebar":`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
  <path d="M2.8001 3.79922C2.8001 3.46672 2.5326 3.19922 2.2001 3.19922C1.8676 3.19922 1.6001 3.46672 1.6001 3.79922V12.1992C1.6001 12.5317 1.8676 12.7992 2.2001 12.7992C2.5326 12.7992 2.8001 12.5317 2.8001 12.1992V3.79922ZM14.2251 8.42422C14.4601 8.18922 14.4601 7.80922 14.2251 7.57672L10.8251 4.17422C10.5901 3.93922 10.2101 3.93922 9.9776 4.17422C9.7451 4.40922 9.7426 4.78922 9.9776 5.02172L12.3526 7.39672H5.4001C5.0676 7.39672 4.8001 7.66422 4.8001 7.99672C4.8001 8.32922 5.0676 8.59672 5.4001 8.59672H12.3526L9.9776 10.9717C9.7426 11.2067 9.7426 11.5867 9.9776 11.8192C10.2126 12.0517 10.5926 12.0542 10.8251 11.8192L14.2251 8.42422Z" fill="currentColor"/>
</svg>`,"file-pdf":`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <path d="M7.18045 2.91977H3.67168C3.39599 2.91977 3.17042 3.14534 3.17042 3.42103V15.4511C3.17042 15.7268 3.39599 15.9524 3.67168 15.9524H6.17794V17.4561H3.67168C2.56579 17.4561 1.66666 16.557 1.66666 15.4511V3.42103C1.66666 2.31514 2.56579 1.41602 3.67168 1.41602H7.85401C8.38659 1.41602 8.89724 1.62592 9.27318 2.00186L13.1109 5.84271C13.4868 6.21865 13.6967 6.7293 13.6967 7.26188V11.9455H12.193V7.93544H9.43609C8.18922 7.93544 7.18045 6.92667 7.18045 5.6798V2.92291V2.91977ZM11.5695 6.42855L8.68421 3.54321V5.67667C8.68421 6.09333 9.01942 6.42855 9.43609 6.42855H11.5695ZM8.18295 13.3208H9.18546C10.2224 13.3208 11.0652 14.1635 11.0652 15.2005C11.0652 16.2374 10.2224 17.0802 9.18546 17.0802H8.80952V17.9574C8.80952 18.302 8.52757 18.5839 8.18295 18.5839C7.83834 18.5839 7.55639 18.302 7.55639 17.9574V13.9473C7.55639 13.6027 7.83834 13.3208 8.18295 13.3208ZM9.18546 15.827C9.53007 15.827 9.81203 15.5451 9.81203 15.2005C9.81203 14.8559 9.53007 14.5739 9.18546 14.5739H8.80952V15.827H9.18546ZM12.193 13.3208H13.1955C14.0946 13.3208 14.8246 14.0507 14.8246 14.9498V16.9549C14.8246 17.854 14.0946 18.5839 13.1955 18.5839H12.193C11.8484 18.5839 11.5664 18.302 11.5664 17.9574V13.9473C11.5664 13.6027 11.8484 13.3208 12.193 13.3208ZM13.1955 17.3308C13.4023 17.3308 13.5714 17.1616 13.5714 16.9549V14.9498C13.5714 14.7431 13.4023 14.5739 13.1955 14.5739H12.8195V17.3308H13.1955ZM15.5764 13.9473C15.5764 13.6027 15.8584 13.3208 16.203 13.3208H17.7068C18.0514 13.3208 18.3333 13.6027 18.3333 13.9473C18.3333 14.292 18.0514 14.5739 17.7068 14.5739H16.8296V15.3258H17.7068C18.0514 15.3258 18.3333 15.6077 18.3333 15.9524C18.3333 16.297 18.0514 16.5789 17.7068 16.5789H16.8296V17.9574C16.8296 18.302 16.5476 18.5839 16.203 18.5839C15.8584 18.5839 15.5764 18.302 15.5764 17.9574V13.9473Z" fill="currentColor"/>
</svg>`,"fp-date":`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
  <path d="M5.40039 1.59961C5.73289 1.59961 6.00039 1.86711 6.00039 2.19961V3.19961H10.0004V2.19961C10.0004 1.86711 10.2679 1.59961 10.6004 1.59961C10.9329 1.59961 11.2004 1.86711 11.2004 2.19961V3.19961H12.0004C12.8829 3.19961 13.6004 3.91711 13.6004 4.79961V11.9996C13.6004 12.8821 12.8829 13.5996 12.0004 13.5996H4.00039C3.11789 13.5996 2.40039 12.8821 2.40039 11.9996V4.79961C2.40039 3.91711 3.11789 3.19961 4.00039 3.19961H4.80039V2.19961C4.80039 1.86711 5.06789 1.59961 5.40039 1.59961ZM5.40039 4.39961H4.00039C3.78039 4.39961 3.60039 4.57961 3.60039 4.79961V5.99961H12.4004V4.79961C12.4004 4.57961 12.2204 4.39961 12.0004 4.39961H5.40039ZM3.60039 7.19961V11.9996C3.60039 12.2196 3.78039 12.3996 4.00039 12.3996H12.0004C12.2204 12.3996 12.4004 12.2196 12.4004 11.9996V7.19961H3.60039Z" fill="currentColor"/>
</svg>`,"fp-sources":`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
  <path d="M1.9998 2.19961C1.9998 1.86711 1.7323 1.59961 1.3998 1.59961C1.0673 1.59961 0.799805 1.86711 0.799805 2.19961V11.3996C0.799805 12.1721 1.4273 12.7996 2.1998 12.7996H6.7998V11.5996H2.1998C2.0898 11.5996 1.9998 11.5096 1.9998 11.3996V5.59961H6.7998V4.39961H1.9998V2.19961ZM10.4373 2.79961L11.2348 3.33211C11.4973 3.50711 11.8073 3.59961 12.1223 3.59961H14.0023V5.99961H9.2023V2.79961H10.4398H10.4373ZM7.9998 2.79961V5.99961C7.9998 6.66211 8.5373 7.19961 9.1998 7.19961H13.9998C14.6623 7.19961 15.1998 6.66211 15.1998 5.99961V3.59961C15.1998 2.93711 14.6623 2.39961 13.9998 2.39961H12.1198C12.0398 2.39961 11.9648 2.37711 11.8973 2.33211L11.1023 1.80211C10.9048 1.66961 10.6723 1.59961 10.4373 1.59961H9.1998C8.5373 1.59961 7.9998 2.13711 7.9998 2.79961ZM10.4373 9.99961L11.2848 10.5646C11.5148 10.7171 11.7848 10.7996 12.0623 10.7996H14.0023V13.1996H9.2023V9.99961H10.4398H10.4373ZM7.9998 9.99961V13.1996C7.9998 13.8621 8.5373 14.3996 9.1998 14.3996H13.9998C14.6623 14.3996 15.1998 13.8621 15.1998 13.1996V10.7996C15.1998 10.1371 14.6623 9.59961 13.9998 9.59961H12.0598C12.0198 9.59961 11.9823 9.58711 11.9498 9.56711L11.1023 9.00211C10.9048 8.86961 10.6748 8.79961 10.4373 8.79961H9.1998C8.5373 8.79961 7.9998 9.33711 7.9998 9.99961Z" fill="currentColor"/>
</svg>`,"group-people":`<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.9998 6.79998C7.1048 6.79998 7.9998 5.90498 7.9998 4.79998C7.9998 3.69498 7.1048 2.79998 5.9998 2.79998C4.8948 2.79998 3.9998 3.69498 3.9998 4.79998C3.9998 5.90498 4.8948 6.79998 5.9998 6.79998ZM5.9998 1.59998C7.7673 1.59998 9.1998 3.03248 9.1998 4.79998C9.1998 6.56748 7.7673 7.99998 5.9998 7.99998C4.2323 7.99998 2.7998 6.56748 2.7998 4.79998C2.7998 3.03248 4.2323 1.59998 5.9998 1.59998ZM5.1998 10.4C3.4323 10.4 1.9998 11.8325 1.9998 13.6V13.8C1.9998 14.1325 1.7323 14.4 1.3998 14.4C1.0673 14.4 0.799805 14.1325 0.799805 13.8V13.6C0.799805 11.17 2.7698 9.19998 5.1998 9.19998H6.7998C9.2298 9.19998 11.1998 11.17 11.1998 13.6V13.8C11.1998 14.1325 10.9323 14.4 10.5998 14.4C10.2673 14.4 9.9998 14.1325 9.9998 13.8V13.6C9.9998 11.8325 8.5673 10.4 6.7998 10.4H5.1998ZM9.3823 7.61498C9.6373 7.30748 9.85231 6.96498 10.0173 6.59748C10.2473 6.72748 10.5148 6.80248 10.7998 6.80248C11.6823 6.80248 12.3998 6.08498 12.3998 5.20248C12.3998 4.31998 11.6823 3.60248 10.7998 3.60248C10.6098 3.60248 10.4273 3.63498 10.2598 3.69498C10.1573 3.29998 10.0023 2.92748 9.8023 2.58498C10.1123 2.46748 10.4498 2.40248 10.7998 2.40248C12.3473 2.40248 13.5998 3.65498 13.5998 5.20248C13.5998 6.74998 12.3473 7.99998 10.7998 7.99998C10.2823 7.99998 9.7973 7.85998 9.3823 7.61498ZM11.6973 10.8825C11.4348 10.41 11.1048 9.97748 10.7198 9.59998H10.9998C13.3198 9.59998 15.1998 11.48 15.1998 13.8C15.1998 14.1325 14.9323 14.4 14.5998 14.4C14.2673 14.4 13.9998 14.1325 13.9998 13.8C13.9998 12.3825 13.0173 11.195 11.6973 10.8825Z" fill="currentColor"/></svg>`,"history-delete":`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
  <path d="M9.83211 1.80005C9.33336 1.80005 8.88336 2.1113 8.70711 2.58005L8.09961 4.20005H4.49961C4.00086 4.20005 3.59961 4.6013 3.59961 5.10005C3.59961 5.5988 4.00086 6.00005 4.49961 6.00005H19.4996C19.9984 6.00005 20.3996 5.5988 20.3996 5.10005C20.3996 4.6013 19.9984 4.20005 19.4996 4.20005H15.8996L15.2921 2.58005C15.1159 2.1113 14.6696 1.80005 14.1671 1.80005H9.83211ZM4.79961 7.80005V19.2C4.79961 20.5238 5.87586 21.6 7.19961 21.6H16.7996C18.1234 21.6 19.1996 20.5238 19.1996 19.2V7.80005H17.3996V19.2C17.3996 19.53 17.1296 19.8 16.7996 19.8H7.19961C6.86961 19.8 6.59961 19.53 6.59961 19.2V7.80005H4.79961ZM10.7996 10.5C10.7996 10.0013 10.3984 9.60005 9.89961 9.60005C9.40086 9.60005 8.99961 10.0013 8.99961 10.5V17.1C8.99961 17.5988 9.40086 18 9.89961 18C10.3984 18 10.7996 17.5988 10.7996 17.1V10.5ZM14.9996 10.5C14.9996 10.0013 14.5984 9.60005 14.0996 9.60005C13.6009 9.60005 13.1996 10.0013 13.1996 10.5V17.1C13.1996 17.5988 13.6009 18 14.0996 18C14.5984 18 14.9996 17.5988 14.9996 17.1V10.5Z" fill="currentColor"/>
</svg>`,"link-external":`<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor">
  <path d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
  <path d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>
</svg>`,"menu-collections":`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
  <path d="M13.6 9.99961H4.79999C4.57999 9.99961 4.39999 9.81961 4.39999 9.59961V3.19961C4.39999 2.97961 4.57999 2.79961 4.79999 2.79961H7.73749C7.84249 2.79961 7.94499 2.84211 8.01999 2.91711L8.91749 3.81461C9.29249 4.18961 9.80249 4.39961 10.3325 4.39961H13.6C13.82 4.39961 14 4.57961 14 4.79961V9.59961C14 9.81961 13.82 9.99961 13.6 9.99961ZM4.79999 11.1996H13.6C14.4825 11.1996 15.2 10.4821 15.2 9.59961V4.79961C15.2 3.91711 14.4825 3.19961 13.6 3.19961H10.3325C10.12 3.19961 9.91749 3.11461 9.76749 2.96461L8.86749 2.06711C8.56749 1.76711 8.16249 1.59961 7.73749 1.59961H4.79999C3.91749 1.59961 3.19999 2.31711 3.19999 3.19961V9.59961C3.19999 10.4821 3.91749 11.1996 4.79999 11.1996ZM1.99999 4.59961C1.99999 4.26711 1.73249 3.99961 1.39999 3.99961C1.06749 3.99961 0.799988 4.26711 0.799988 4.59961V11.9996C0.799988 12.8821 1.51749 13.5996 2.39999 13.5996H12.2C12.5325 13.5996 12.8 13.3321 12.8 12.9996C12.8 12.6671 12.5325 12.3996 12.2 12.3996H2.39999C2.17999 12.3996 1.99999 12.2196 1.99999 11.9996V4.59961Z" fill="#445556"/>
</svg>`,"menu-share":`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
  <path d="M9.39961 6.00042C9.73211 6.00042 9.99961 5.73292 9.99961 5.40042V3.76542L13.0346 6.80042L9.99961 9.83542V8.20042C9.99961 7.86792 9.73211 7.60042 9.39961 7.60042H6.39961C4.74461 7.60042 3.34961 8.71792 2.92961 10.2379C2.84711 9.92792 2.79961 9.58292 2.79961 9.20042C2.79961 7.43292 4.23211 6.00042 5.99961 6.00042H9.39961ZM8.79961 8.80042V10.8004C8.79961 11.1229 8.99461 11.4154 9.29461 11.5404C9.59461 11.6654 9.93711 11.5954 10.1671 11.3679L14.1671 7.36792C14.4796 7.05542 14.4796 6.54792 14.1671 6.23542L10.1671 2.23542C9.93711 2.00542 9.59461 1.93792 9.29461 2.06292C8.99461 2.18792 8.79961 2.47792 8.79961 2.80042V4.80042H5.99961C3.56961 4.80042 1.59961 6.77042 1.59961 9.20042C1.59961 11.1504 2.56461 12.3554 3.31711 13.0029C3.41961 13.0904 3.51961 13.1679 3.60961 13.2354C3.68961 13.2954 3.76461 13.3454 3.83211 13.3904C3.94461 13.4654 4.03961 13.5179 4.10211 13.5529C4.16461 13.5879 4.23461 13.6004 4.30461 13.6004C4.57711 13.6004 4.79711 13.3779 4.79711 13.1079C4.79711 12.9379 4.70711 12.7779 4.58961 12.6554C4.57711 12.6429 4.56711 12.6329 4.55461 12.6204C4.49461 12.5629 4.42711 12.4929 4.36211 12.4054C4.31961 12.3479 4.27711 12.2804 4.23711 12.2079C4.10461 11.9654 3.99961 11.6354 3.99961 11.2029C3.99961 9.87792 5.07461 8.80292 6.39961 8.80292H8.79961V8.80042Z" fill="#445556"/>
</svg>`,"menu-upload":`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
  <path d="M8.42502 1.77586C8.19002 1.54086 7.81002 1.54086 7.57752 1.77586L4.17502 5.17586C3.94002 5.41086 3.94002 5.79086 4.17502 6.02336C4.41002 6.25586 4.79002 6.25836 5.02252 6.02336L7.39752 3.64836V9.80086C7.39752 10.1334 7.66502 10.4009 7.99752 10.4009C8.33002 10.4009 8.59752 10.1334 8.59752 9.80086V3.64836L10.9725 6.02336C11.2075 6.25836 11.5875 6.25836 11.82 6.02336C12.0525 5.78836 12.055 5.40836 11.82 5.17586L8.42502 1.77586ZM3.60002 10.2009C3.60002 9.86836 3.33252 9.60086 3.00002 9.60086C2.66752 9.60086 2.40002 9.86836 2.40002 10.2009V12.0009C2.40002 13.3259 3.47502 14.4009 4.80002 14.4009H11.2C12.525 14.4009 13.6 13.3259 13.6 12.0009V10.2009C13.6 9.86836 13.3325 9.60086 13 9.60086C12.6675 9.60086 12.4 9.86836 12.4 10.2009V12.0009C12.4 12.6634 11.8625 13.2009 11.2 13.2009H4.80002C4.13752 13.2009 3.60002 12.6634 3.60002 12.0009V10.2009Z" fill="currentColor"/>
</svg>`,"more-h":`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
  <circle cx="3" cy="8" r="1.5" fill="currentColor"/>
  <circle cx="8" cy="8" r="1.5" fill="currentColor"/>
  <circle cx="13" cy="8" r="1.5" fill="currentColor"/>
</svg>`,"panel-close":`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
  <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
</svg>`,"share-info":`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M8 2.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11zM1.5 8a6.5 6.5 0 1 1 13 0 6.5 6.5 0 0 1-13 0zM8.75 5.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zM7.5 7.5a.5.5 0 0 1 1 0v3a.5.5 0 0 1-1 0v-3z"/>
</svg>`,"suggestion-search":`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
  <path d="M10.8 6.79961C10.8 4.58961 9.01001 2.79961 6.80001 2.79961C4.59001 2.79961 2.80001 4.58961 2.80001 6.79961C2.80001 9.00961 4.59001 10.7996 6.80001 10.7996C9.01001 10.7996 10.8 9.00961 10.8 6.79961ZM10.0275 10.8771C9.14251 11.5796 8.02001 11.9996 6.80001 11.9996C3.92751 11.9996 1.60001 9.67211 1.60001 6.79961C1.60001 3.92711 3.92751 1.59961 6.80001 1.59961C9.67251 1.59961 12 3.92711 12 6.79961C12 8.01961 11.58 9.14211 10.8775 10.0271L14.225 13.3746C14.46 13.6096 14.46 13.9896 14.225 14.2221C13.99 14.4546 13.61 14.4571 13.3775 14.2221L10.0275 10.8771Z" fill="currentColor"/>
</svg>`,"ut-check":`<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M2.5 8.5L6 12L13.5 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,"ut-error":`<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="8" cy="8" r="5.5" stroke="currentColor" stroke-width="1.5"/>
  <path d="M5.5 5.5L10.5 10.5M10.5 5.5L5.5 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
</svg>`,"ut-sync":`<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M4.3251 4.3226C6.3551 2.2926 9.6476 2.2926 11.6801 4.3226L12.3576 5.0001H10.4026C10.0701 5.0001 9.8026 5.2676 9.8026 5.6001C9.8026 5.9326 10.0701 6.2001 10.4026 6.2001H13.8051C14.1376 6.2001 14.4051 5.9326 14.4051 5.6001V2.2001C14.4051 1.8676 14.1376 1.6001 13.8051 1.6001C13.4726 1.6001 13.2051 1.8676 13.2051 2.2001V4.1526L12.5276 3.4751C10.0276 0.975098 5.9751 0.975098 3.4776 3.4751C2.3976 4.5551 1.7826 5.9276 1.6376 7.3376C1.6026 7.6676 1.8426 7.9626 2.1726 7.9951C2.5026 8.0276 2.7976 7.7901 2.8301 7.4601C2.9501 6.3151 3.4476 5.2026 4.3251 4.3226ZM14.3676 8.6626C14.4026 8.3326 14.1626 8.0376 13.8326 8.0051C13.5026 7.9726 13.2076 8.2101 13.1751 8.5401C13.0576 9.6851 12.5576 10.8001 11.6801 11.6776C9.6501 13.7076 6.3576 13.7076 4.3251 11.6776L3.6476 11.0001H5.6026C5.9351 11.0001 6.2026 10.7326 6.2026 10.4001C6.2026 10.0676 5.9351 9.8001 5.6026 9.8001H2.2001C1.8676 9.8001 1.6001 10.0676 1.6001 10.4001V13.8001C1.6001 14.1326 1.8676 14.4001 2.2001 14.4001C2.5326 14.4001 2.8001 14.1326 2.8001 13.8001V11.8476L3.4776 12.5251C5.9776 15.0251 10.0301 15.0251 12.5276 12.5251C13.6076 11.4451 14.2226 10.0726 14.3676 8.6626Z" fill="currentColor"/>
</svg>`,"ut-upload":`<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M8.4249 1.77488C8.1899 1.53988 7.8099 1.53988 7.5774 1.77488L4.1749 5.17488C3.9399 5.40988 3.9399 5.78988 4.1749 6.02238C4.4099 6.25488 4.7899 6.25738 5.0224 6.02238L7.3974 3.64738V9.79988C7.3974 10.1324 7.6649 10.3999 7.9974 10.3999C8.3299 10.3999 8.5974 10.1324 8.5974 9.79988V3.64738L10.9724 6.02238C11.2074 6.25738 11.5874 6.25738 11.8199 6.02238C12.0524 5.78738 12.0549 5.40738 11.8199 5.17488L8.4249 1.77488ZM3.5999 10.1999C3.5999 9.86738 3.3324 9.59988 2.9999 9.59988C2.6674 9.59988 2.3999 9.86738 2.3999 10.1999V11.9999C2.3999 13.3249 3.4749 14.3999 4.7999 14.3999H11.1999C12.5249 14.3999 13.5999 13.3249 13.5999 11.9999V10.1999C13.5999 9.86738 13.3324 9.59988 12.9999 9.59988C12.6674 9.59988 12.3999 9.86738 12.3999 10.1999V11.9999C12.3999 12.6624 11.8624 13.1999 11.1999 13.1999H4.7999C4.1374 13.1999 3.5999 12.6624 3.5999 11.9999V10.1999Z" fill="currentColor"/>
</svg>`,"zoom-in":`<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.95039 2.45039C7.88414 2.45039 9.45039 4.01664 9.45039 5.95039C9.45039 7.88414 7.88414 9.45039 5.95039 9.45039C4.01664 9.45039 2.45039 7.88414 2.45039 5.95039C2.45039 4.01664 4.01664 2.45039 5.95039 2.45039ZM5.95039 10.5004C7.01789 10.5004 8.00008 10.1329 8.77445 9.5182L11.7035 12.4473C11.9091 12.6529 12.2416 12.6529 12.4451 12.4473C12.6485 12.2416 12.6507 11.9091 12.4451 11.7057L9.5182 8.77445C10.1329 8.00008 10.5004 7.01789 10.5004 5.95039C10.5004 3.43695 8.46383 1.40039 5.95039 1.40039C3.43695 1.40039 1.40039 3.43695 1.40039 5.95039C1.40039 8.46383 3.43695 10.5004 5.95039 10.5004ZM5.95039 3.85039C5.65945 3.85039 5.42539 4.08445 5.42539 4.37539V5.42539H4.37539C4.08445 5.42539 3.85039 5.65945 3.85039 5.95039C3.85039 6.24133 4.08445 6.47539 4.37539 6.47539H5.42539V7.52539C5.42539 7.81633 5.65945 8.05039 5.95039 8.05039C6.24133 8.05039 6.47539 7.81633 6.47539 7.52539V6.47539H7.52539C7.81633 6.47539 8.05039 6.24133 8.05039 5.95039C8.05039 5.65945 7.81633 5.42539 7.52539 5.42539H6.47539V4.37539C6.47539 4.08445 6.24133 3.85039 5.95039 3.85039Z" fill="currentColor"/></svg>`,"zoom-out":`<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.95039 2.45039C7.88414 2.45039 9.45039 4.01664 9.45039 5.95039C9.45039 7.88414 7.88414 9.45039 5.95039 9.45039C4.01664 9.45039 2.45039 7.88414 2.45039 5.95039C2.45039 4.01664 4.01664 2.45039 5.95039 2.45039ZM5.95039 10.5004C7.01789 10.5004 8.00008 10.1329 8.77445 9.5182L11.7035 12.4473C11.9091 12.6529 12.2416 12.6529 12.4451 12.4473C12.6485 12.2416 12.6507 11.9091 12.4451 11.7057L9.5182 8.77445C10.1329 8.00008 10.5004 7.01789 10.5004 5.95039C10.5004 3.43695 8.46383 1.40039 5.95039 1.40039C3.43695 1.40039 1.40039 3.43695 1.40039 5.95039C1.40039 8.46383 3.43695 10.5004 5.95039 10.5004ZM4.37539 5.42539C4.08445 5.42539 3.85039 5.65945 3.85039 5.95039C3.85039 6.24133 4.08445 6.47539 4.37539 6.47539H7.52539C7.81633 6.47539 8.05039 6.24133 8.05039 5.95039C8.05039 5.65945 7.81633 5.42539 7.52539 5.42539H4.37539Z" fill="currentColor"/></svg>`};function R(r){r.querySelectorAll(`[data-icon]`).forEach(e=>{let n=ht[e.getAttribute(`data-icon`)];if(n){let i=document.createElement(`span`);i.innerHTML=n,e.replaceWith(i.firstChild)}})}var br={"common.add":`Add`,"common.cancel":`Cancel`,"common.clearSearch":`Clear search`,"common.close":`Close`,"common.collapse":`Collapse`,"common.create":`Create`,"common.delete":`Delete`,"common.deleteWarning":`{name} will be permanently deleted. This action cannot be undone.`,"common.deleting":`Deleting…`,"common.edit":`Edit`,"common.expand":`Expand`,"common.gridView":`Grid view`,"common.listView":`List view`,"common.minimize":`Minimize`,"common.moreOptions":`More options`,"common.refresh":`Refresh`,"common.remove":`Remove`,"common.required":`Required`,"common.retry":`Retry`,"common.save":`Save`,"common.select":`Select`,"common.selectAll":`Select All`,"common.unselectAll":`Unselect All`,"common.you":`You`,"detail.back":`Back to workspaces`,"detail.columnDate":`Date`,"detail.columnName":`Name`,"detail.columnSize":`Size`,"detail.columnSource":`Source`,"detail.deleteDocTitle":`Delete document?`,"detail.deleteDocument":`Delete document`,"detail.deleteDocumentsTitle.one":`Delete {count} document?`,"detail.deleteDocumentsTitle.other":`Delete {count} documents?`,"detail.docsLoadError":`Couldn’t load documents.`,"detail.docsLoading":`Loading documents…`,"detail.documentCount.one":`{count} document`,"detail.documentCount.other":`{count} documents`,"detail.emptySubtitle":`Documents added to this workspace will appear here`,"detail.emptyTitle":`No documents yet`,"detail.fileCount.one":`{count} file`,"detail.fileCount.other":`{count} files`,"detail.refreshError":`Couldn’t refresh documents: {error}`,"detail.searchPlaceholder":`Search files...`,"detail.selectedDocumentCount.one":`{count} document selected`,"detail.selectedDocumentCount.other":`{count} documents selected`,"detail.upload":`Upload`,"detail.uploadedBy":`Uploaded by {name}`,"edit.addTag":`Add tag`,"edit.addTitle":`Add workspace`,"edit.creating":`Creating…`,"edit.descriptionLabel":`Description`,"edit.descriptionPlaceholder":`Describe this workspace…`,"edit.editTitle":`Edit workspace`,"edit.nameLabel":`Title`,"edit.nameRequired":`Title is required`,"edit.removeTag":`Remove {tag}`,"edit.saving":`Saving…`,"edit.shareHint":`Search a user to grant access · click a role chip to switch between Owner and Reader`,"edit.shareLabel":`Share with`,"edit.tagsHint":`Press comma or Enter to add a tag · Backspace to remove the last one`,"edit.tagsLabel":`Tags`,"edit.tagsPlaceholder":`Type a tag and press comma…`,"errors.forbidden":`You don’t have permission to do this.`,"errors.generic":`Something went wrong. Please try again.`,"errors.notFound":`This item could not be found — it may have been deleted.`,"errors.signIn":`You need to sign in to do this.`,"format.added":`Added {relative}`,"format.addedJustNow":`Added just now`,"format.uploadedJustNow":`Uploaded just now`,"list.addCollection":`Add Workspace`,"list.bulkDeleteFailed.one":`This workspace could not be deleted: {names}.`,"list.bulkDeleteFailed.other":`These workspaces could not be deleted: {names}.`,"list.collectionCount.one":`{count} workspace`,"list.collectionCount.other":`{count} workspaces`,"list.deleteCollection":`Delete workspace`,"list.deleteCollectionsTitle.one":`Delete {count} workspace?`,"list.deleteCollectionsTitle.other":`Delete {count} workspaces?`,"list.deleteTitle":`Delete workspace?`,"list.loadError":`Couldn’t load workspaces.`,"list.loading":`Loading workspaces…`,"list.refreshError":`Couldn’t refresh workspaces: {error}`,"list.roleOwner":`Owner`,"list.roleShared":`Shared`,"list.searchPlaceholder":`Search workspace...`,"list.selectedCount.one":`{count} selected`,"list.selectedCount.other":`{count} selected`,"list.subtitle":`Organize documents into reusable sets.`,"list.tabAll":`All Workspaces`,"list.tabEditor":`Editor`,"list.tabReader":`Reader`,"list.title":`Workspaces`,"mention.documentCount.one":`{count} document`,"mention.documentCount.other":`{count} documents`,"mention.loadError":`Couldn’t load workspaces.`,"mention.loading":`Loading…`,"picker.addedTo":`Added to {name}`,"picker.collectionName":`Workspace name`,"picker.duplicateName":`A workspace with this name already exists`,"picker.moveToCollection":`Move to workspace`,"picker.namePlaceholder":`e.g. Cardiology Research`,"picker.newCollection":`New workspace`,"picker.quickCollection":`Quick Workspace`,"picker.saveToCollection":`Save to workspace`,"picker.saved":`Saved!`,"picker.savedTo":`Saved to {name}`,"preview.askFollowUp":`Ask follow-up`,"preview.askFollowUpPlaceholder":`Ask follow-up about the document`,"preview.close":`Close preview`,"preview.collapsePassages":`Collapse passages`,"preview.currentPage":`Current page`,"preview.dateLabel":`Date:`,"preview.expandPassages":`Expand passages`,"preview.findPlaceholder":`Find text...`,"preview.loading":`Loading preview…`,"preview.nextPage":`Next page`,"preview.nextResult":`Next result`,"preview.pageNumber":`Page {page}`,"preview.passages":`Passages`,"preview.previousPage":`Previous page`,"preview.previousResult":`Previous result`,"preview.sourceLabel":`Source:`,"preview.suggestionActionItems":`Find action items`,"preview.suggestionKeyPoints":`Key points`,"preview.suggestionSummarize":`Summarize it`,"preview.unavailable":`This document cannot be previewed.`,"preview.zoomIn":`Zoom in`,"preview.zoomOut":`Zoom out`,"share.accessCount.one":`{count} person has access`,"share.accessCount.other":`{count} people have access`,"share.accessNotice":`Some documents in this workspace may not be accessible to all shared users. Documents from shared drives or external sources remain subject to their original access permissions. Locally uploaded files from your personal device will always be accessible through the shared workspace.`,"share.addPeople":`Add people`,"share.adding":`Adding…`,"share.changeRoleToOwner":`Make {name} an Owner`,"share.changeRoleToReader":`Make {name} a Reader`,"share.confirmRemove":`Remove {name} from this workspace?`,"share.noMatches":`No matches found.`,"share.owner":`Owner`,"share.ownerDescription":`Can add or remove people, change roles, and manage the workspace.`,"share.reader":`Reader`,"share.readerDescription":`Can view and use the workspace.`,"share.removeUser":`Remove {name}`,"share.searchFailed":`Search failed — try again.`,"share.searchPlaceholder":`Search by name or email…`,"share.searchUsers":`Search users`,"share.searching":`Searching…`,"share.title":`Manage access`,"share.unresolvedName":`Name could not be resolved for this id`,"share.you":`(you)`,"tracker.clickToOpen":`Click to open`,"tracker.clickToRestore":`Click to restore`,"tracker.collectionCount.one":`{count} workspace`,"tracker.collectionCount.other":`{count} workspaces`,"tracker.complete":`Complete`,"tracker.completedCount.one":`{count} completed`,"tracker.completedCount.other":`{count} completed`,"tracker.connectionLost":`Connection lost`,"tracker.dismiss":`Dismiss`,"tracker.errorCount.one":`{count} error`,"tracker.errorCount.other":`{count} errors`,"tracker.failedCount.one":`{count} failed`,"tracker.failedCount.other":`{count} failed`,"tracker.fileCount.one":`{count} file`,"tracker.fileCount.other":`{count} files`,"tracker.fileIndexed":`File indexed`,"tracker.givesUpIn":`gives up in {time}`,"tracker.indexedCount.one":`{count} indexed`,"tracker.indexedCount.other":`{count} indexed`,"tracker.indexedFileCount.one":`{count} file indexed`,"tracker.indexedFileCount.other":`{count} files indexed`,"tracker.indexingCount.one":`{count} indexing`,"tracker.indexingCount.other":`{count} indexing`,"tracker.lostAgo":`lost {time} ago`,"tracker.nextCollection":`Next workspace`,"tracker.nextTryIn":`Next try in {time}`,"tracker.previousCollection":`Previous workspace`,"tracker.reconnecting":`Reconnecting…`,"tracker.restoringSession":`Restoring your session.`,"tracker.retryAttempt":`Retry {attempt} of {max}`,"tracker.retryAttemptWithFiles":`Retry {attempt} of {max} · {files}`,"tracker.sectionCompleted":`Completed`,"tracker.sectionFailed":`Failed`,"tracker.sectionIndexing":`Indexing`,"tracker.sectionNotIndexed":`Not indexed`,"tracker.sectionUploading":`Uploading`,"tracker.signInAgain":`Sign in again to resume tracking.`,"tracker.signedOut":`Signed out`,"tracker.stageIndexing":`2/2 Indexing`,"tracker.stageUploading":`1/2 Uploading`,"tracker.toggleSection":`Toggle`,"tracker.tryingNow":`Trying now…`,"tracker.uploadCount.one":`{count} upload`,"tracker.uploadCount.other":`{count} uploads`,"tracker.uploadFailed":`Upload failed`,"tracker.uploadingCount.one":`{count} uploading`,"tracker.uploadingCount.other":`{count} uploading`,"tracker.uploadsPaused":`{files} paused. Sign in again, then retry.`,"upload.browse":`click to browse`,"upload.dropPrefix":`Drop your files here, or `,"upload.dropzoneLabel":`Drop zone — click to browse files`,"upload.modalTitle":`Upload Documents`,"upload.uploadCount.one":`Upload {count} file`,"upload.uploadCount.other":`Upload {count} files`};var mt=/\{\s*([a-zA-Z0-9_]+)\s*\}/g;var fr=`en`;var xr=null;var gn=new Intl.PluralRules(`en`);var wr=new Set;function yr(r,e){return e?r.replace(mt,(n,i)=>i in e?String(e[i]):n):r}function hn(r,e){let n=br[r];return n===void 0?r:yr(n,e)}function y(r,e){let n=xr?.(r,e);return n===void 0||n===``?hn(r,e):yr(n,e)}function pe(r$1,e,n){let i=r({count:e},n),c=gn.select(e),l=xr?.(`${r$1}.${c}`,i);if(l!==void 0&&l!==``)return yr(l,i);return hn(`${r$1}.${br[`${r$1}.${c}`]!==void 0?c:`other`}`,i)}function er(){return fr}function Ce(r){wr.add(r),vn(r)}function De(r){wr.delete(r)}function vn(r){bt(r)&&r.host.setAttribute(`lang`,fr),r.querySelectorAll(`[data-i18n]`).forEach(e=>{e.textContent=un(e,e.dataset.i18n)}),r.querySelectorAll(`[data-i18n-attr]`).forEach(e=>{for(let n of e.dataset.i18nAttr.split(`;`)){let i=n.indexOf(`:`);if(i<0)continue;let c=n.slice(0,i).trim(),l=n.slice(i+1).trim();c&&l&&e.setAttribute(c,un(e,l))}})}function X(r,e,n){r.dataset.i18n=e,delete r.dataset.i18nCount,bn(r,n),r.textContent=y(e,n)}function se(r,e,n,i){r.dataset.i18n=e,r.dataset.i18nCount=String(n),bn(r,i),r.textContent=pe(e,n,i)}function rr(r){delete r.dataset.i18n,delete r.dataset.i18nCount,delete r.dataset.i18nParams,r.textContent=``}function bn(r,e){e?r.dataset.i18nParams=JSON.stringify(e):delete r.dataset.i18nParams}function un(r,e){let n=vt(r),i=r.dataset.i18nCount;if(i===void 0)return y(e,n);let c=Number(i);return Number.isNaN(c)?y(e,n):pe(e,c,n)}function vt(r){let e=r.dataset.i18nParams;if(e)try{return JSON.parse(e)}catch{return}}function Se(r){return JSON.stringify(r).replace(/&/g,`&amp;`).replace(/"/g,`&quot;`).replace(/</g,`&lt;`)}function bt(r){return typeof ShadowRoot<`u`&&r instanceof ShadowRoot}function tr(r,e){let n=r.dataset.rawText||r.textContent||``;r.dataset.rawText=n;let i=e?n.toLowerCase().indexOf(e.toLowerCase()):-1;if(i===-1){r.textContent=n;return}let c=document.createElement(`mark`);c.className=`lq-search-highlight`,c.textContent=n.slice(i,i+e.length),r.textContent=``,r.append(n.slice(0,i),c,n.slice(i+e.length))}var nr=8;function fn(r){let e=document.createElement(`span`);e.setAttribute(`role`,`tooltip`),e.style.display=`none`,r.appendChild(e);function n(c,l){let f=c.getBoundingClientRect(),g=e.style;switch(g.top=g.bottom=g.left=g.right=g.transform=``,l){case`right`:g.top=f.top+f.height/2+`px`,g.left=f.right+nr+`px`,g.transform=`translateY(-50%)`;break;case`left`:g.top=f.top+f.height/2+`px`,g.right=window.innerWidth-f.left+nr+`px`,g.transform=`translateY(-50%)`;break;case`bottom`:g.top=f.bottom+nr+`px`,g.left=f.left+f.width/2+`px`,g.transform=`translateX(-50%)`;break;default:g.bottom=window.innerHeight-f.top+nr+`px`,g.left=f.left+f.width/2+`px`,g.transform=`translateX(-50%)`}}function i(c,l,f,g){c.addEventListener(`mouseenter`,()=>{g&&!g()||(e.textContent=y(l),e.className=`oc-tooltip oc-tooltip-placement-${f}`,e.style.display=``,n(c,f))}),c.addEventListener(`mouseleave`,()=>{e.style.display=`none`}),c.addEventListener(`mousedown`,()=>{e.style.display=`none`})}return{attach:i,position:n,el:e}}function ae(r,e,n){if(e){if(r.dataset.lqBusy===`1`)return;r.dataset.lqBusy=`1`,r.dataset.lqBusyOriginalHtml=r.innerHTML,r.disabled=!0,r.innerHTML=`<span class="lq-btn__spinner" aria-hidden="true"></span>${n?`<span>${n}</span>`:``}`}else{if(r.dataset.lqBusy!==`1`)return;delete r.dataset.lqBusy,r.disabled=!1,r.innerHTML=r.dataset.lqBusyOriginalHtml??``,delete r.dataset.lqBusyOriginalHtml}}function ue(r,e){r.textContent=e,r.hidden=!1}function oe(r){r.textContent=``,r.hidden=!0}function K(r){return r.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`)}function ze(r,e){r.innerHTML=y(`common.deleteWarning`,{name:`<strong>${K(e)}</strong>`})}function xn(r,e){let n=null;return(...i)=>{n&&clearTimeout(n),n=setTimeout(()=>{n=null,r(...i)},e)}}var kr=new WeakMap;var ft=`a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])`;function xe(r,e,n,i){let c=r.getElementById(e),l=r.getElementById(n);R(l),c.hidden=!1,l.hidden=!1,requestAnimationFrame(()=>{c.classList.add(`lq-confirm--open`),l.classList.add(`lq-confirm--open`)});let f=r.activeElement,g=[];Array.from(r.children).forEach(I=>{if(I===l||I===c||I.id===`lq-upload-tracker`||I.hasAttribute(`inert`))return;let H=I;H.setAttribute(`inert`,``),H.style.pointerEvents=`none`,g.push(H)});function q(){return Array.from(l.querySelectorAll(ft))}l.contains(r.activeElement)||q()[0]?.focus();function V(I){if(I.key===`Escape`){I.stopPropagation(),i();return}if(I.key!==`Tab`)return;let H=q();if(!H.length)return;let O=H[0],$=H[H.length-1],d=r.activeElement;I.shiftKey?(d===O||!l.contains(d))&&(I.preventDefault(),$.focus()):(d===$||!l.contains(d))&&(I.preventDefault(),O.focus())}l.addEventListener(`keydown`,V),kr.set(l,{previouslyFocused:f,inerted:g,onKeydown:V})}function we(r,e,n){let i=r.getElementById(e),c=r.getElementById(n);i.classList.remove(`lq-confirm--open`),c.classList.remove(`lq-confirm--open`),c.addEventListener(`transitionend`,()=>{c.hidden=!0,i.hidden=!0},{once:!0});let l=kr.get(c);l&&(kr.delete(c),c.removeEventListener(`keydown`,l.onKeydown),l.inerted.forEach(f=>{f.removeAttribute(`inert`),f.style.pointerEvents=``}),l.previouslyFocused&&r.contains(l.previouslyFocused)&&l.previouslyFocused.focus())}function wn(r){let e=document.createElement(`div`);e.className=`lq-mobile-sheet`,e.hidden=!0;let n=document.createElement(`div`);n.className=`lq-mobile-sheet__backdrop`;let i=document.createElement(`div`);i.className=`lq-mobile-sheet__panel`;let c=document.createElement(`div`);c.className=`lq-mobile-sheet__handle`;let l=document.createElement(`div`);l.className=`lq-mobile-sheet__header`;let f=document.createElement(`div`);f.className=`lq-mobile-sheet__title`;let g=document.createElement(`div`);g.className=`lq-mobile-sheet__body`,l.appendChild(f),i.append(c,l,g),e.append(n,i),r.appendChild(e);let q=null,V=null;function I(a,s,h){q=a,V=h||null,g.appendChild(a),a.hidden=!1,f.textContent=s,e.hidden=!1,requestAnimationFrame(()=>{e.classList.add(`lq-mobile-sheet--open`)}),R(g)}function H(){e.classList.remove(`lq-mobile-sheet--open`),i.style.transform=``,i.style.transition=``,i.addEventListener(`transitionend`,function a(){i.removeEventListener(`transitionend`,a),e.hidden=!0,q&&(q.hidden=!0,V&&V.appendChild(q),q=null,V=null),g.innerHTML=``},{once:!0})}n.addEventListener(`click`,H);let O=0,$=0,d=!1;return c.addEventListener(`touchstart`,a=>{O=a.touches[0].clientY,$=O,d=!0,i.style.transition=`none`},{passive:!0}),r.addEventListener(`touchmove`,(a=>{if(!d)return;$=a.touches[0].clientY;let s=Math.max(0,$-O);i.style.transform=`translateY(${s}px)`}),{passive:!0}),r.addEventListener(`touchend`,()=>{if(!d)return;d=!1;let a=$-O;i.style.transition=``,a>80?H():i.style.transform=``}),{open:I,close:H}}var yn=[`col-folder`,`col-folder-teal`,`col-folder-pink`,`col-folder-blue`,`col-folder-orange`,`col-folder-indigo`,`col-folder-green`];function _n(r){let e=0;for(let i=0;i<r.length;i++)e=e*31+r.charCodeAt(i)|0;return yn[Math.abs(e)%yn.length]}function Ne(r){let e=r.slice(r.lastIndexOf(`.`)).toLowerCase();return e===`.pdf`?`pdf`:e===`.csv`||e===`.xlsx`?`csv`:`doc`}var xt=6e4;var wt=36e5;var yt=864e5;function qn(r,e=Date.now()){let n=new Date(r);if(Number.isNaN(n.getTime()))return``;let i=Math.max(0,e-n.getTime()),c=Math.floor(i/xt),l=Math.floor(i/wt),f=Math.floor(i/yt);return c<1?y(`format.addedJustNow`):y(`format.added`,{relative:_t(c,l,f)})}function _t(r,e,n){let i=kt();return r<60?i.format(-r,`minute`):e<24?i.format(-e,`hour`):n<7?i.format(-n,`day`):n<30?i.format(-Math.floor(n/7),`week`):i.format(-Math.floor(n/30),`month`)}var qr=null;var kn=``;function kt(){let r=er();return(!qr||kn!==r)&&(qr=new Intl.RelativeTimeFormat(r,{numeric:`auto`}),kn=r),qr}function Cn(r){let e=er();if(r<1024)return new Intl.NumberFormat(e,{style:`unit`,unit:`byte`}).format(r);if(r<1048576){let i=Math.max(1,Math.round(r/1024));return new Intl.NumberFormat(e,{style:`unit`,unit:`kilobyte`}).format(i)}let n=r/1048576;return new Intl.NumberFormat(e,{style:`unit`,unit:`megabyte`,maximumFractionDigits:1}).format(n)}function Te(r){return{id:r.id,name:r.name,desc:r.description??``,tags:r.tags??[],docs:r.documentCount,icon:_n(r.id),creatorId:r.creator,ownerIds:r.owners??[],readerIds:r.readers??[],currentUserRole:r.currentUserRole}}function Cr(r){switch(r){case`uploading`:return`uploading`;case`ready_for_indexing`:case`indexing`:return`indexing`;case`indexed`:return null;case`integrity_failed`:case`failed`:return`error`;default:return}}function Ze(r){let e=r;return{_id:r.id,name:r.name,containerId:r.containerId,type:Ne(r.name),date:qn(r.createdAt),status:Cr(e.status),percent:e.percent,jobId:e.jobId}}var or=100;var Er=class extends EventTarget{collections=[];documents={};selectedIds=new Set;_loaded=!1;_loadingPromise=null;_page=0;_total=0;_documentsState={};_emit(e,n){this.dispatchEvent(new CustomEvent(e,{detail:n}))}getAll(){return this.collections}get(e){return this.collections.find(n=>n.id===e)||null}async fetchContainer(e){let i=Te(await Ft(e)),c=this.collections.findIndex(l=>l.id===e);return c===-1?this.collections.push(i):this.collections[c]=i,i}get hasMoreCollections(){return this.collections.length<this._total}ensureLoaded(){return this._loaded?Promise.resolve(this.collections):(this._loadingPromise||(this._loadingPromise=this.load()),this._loadingPromise)}reload(){return this._loadingPromise||(this._loadingPromise=this.load()),this._loadingPromise}async load(){try{let e=await It$1({page:1,pageSize:or});return this.collections=e.containers.map(Te),this._page=e.page,this._total=e.total,this._loaded=!0,this._emit(`collections-loaded`,{collections:this.collections}),this.collections}finally{this._loadingPromise=null}}async loadMore(){if(!this.hasMoreCollections)return this.collections;let e=await It$1({page:this._page+1,pageSize:or});return this.collections=[...this.collections,...e.containers.map(Te)],this._page=e.page,this._total=e.total,this._emit(`collections-loaded`,{collections:this.collections}),this.collections}async create({name:e,desc:n=``,tags:i=[],owners:c=[],readers:l=[]}){let g=Te(await Nt({name:e,description:n,tags:i,owners:c,readers:l}));return this.collections.push(g),this.documents[g.id]=[],this._emit(`collection-created`,{collection:g}),g}async update(e,n){if(!this.get(e))return null;let l=Te(await jt(e,n)),f=this.collections.findIndex(g=>g.id===e);return f!==-1&&(this.collections[f]=l),this._emit(`collection-updated`,{collection:l}),l}async remove(e){let n=await Bt$1(e),i=new Set(n.succeeded);this.collections=this.collections.filter(l=>!i.has(l.id)),n.succeeded.forEach(l=>{delete this.documents[l],this.selectedIds.delete(l)});let c=n.failed.map(l=>({id:l.containerId,error:l.error}));return this._emit(`collection-deleted`,{succeeded:n.succeeded,failed:c}),{succeeded:n.succeeded,failed:c}}getDocuments(e){return this.documents[e]||[]}hasMoreDocuments(e){let n=this._documentsState[e];return n?this.getDocuments(e).length<n.total:!1}async loadDocuments(e){let n=await zt$1(e,{page:1,pageSize:or}),i=n.documents.map(Ze);return this.documents[e]=i,this._documentsState[e]={page:n.page,total:n.total},this._emit(`documents-loaded`,{collectionId:e,documents:i}),i}async loadMoreDocuments(e){if(!this.hasMoreDocuments(e))return this.getDocuments(e);let n=(this._documentsState[e]?.page??0)+1,i=await zt$1(e,{page:n,pageSize:or}),c=[...this.getDocuments(e),...i.documents.map(Ze)];return this.documents[e]=c,this._documentsState[e]={page:i.page,total:i.total},this._emit(`documents-loaded`,{collectionId:e,documents:c}),c}addDocuments(e,n){let i=this.documents[e]||(this.documents[e]=[]);i.push(...n);let c=this.get(e);c&&(c.docs=i.length),this._emit(`document-uploaded`,{collectionId:e,docs:n})}async saveDocuments(e,n){let c=(await Qt(e,n.map(g=>({name:g.name})))).map(Ze),l=this.documents[e]||(this.documents[e]=[]);l.push(...c);let f=this.get(e);return f&&(f.docs=l.length),this._emit(`document-uploaded`,{collectionId:e,docs:c}),c}async removeDocuments(e,n){await Wt(e,n);let i=this.documents[e]||[];this.documents[e]=i.filter(l=>!n.includes(l._id));let c=this.get(e);c&&(c.docs=this.documents[e].length),this._emit(`document-deleted`,{collectionId:e,docIds:n})}async moveDocuments(e,n,i){let c=this.documents[e]||[],l=c.filter(H=>i.includes(H._id));if(!l.length)return;let g=(await Qt(n,l.map(H=>({name:H.name})))).map(Ze),q=this.documents[n]||(this.documents[n]=[]);q.push(...g),await Wt(e,i),this.documents[e]=c.filter(H=>!i.includes(H._id));let V=this.get(e),I=this.get(n);V&&(V.docs=this.documents[e].length),I&&(I.docs=q.length),this._emit(`document-moved`,{fromCollectionId:e,toCollectionId:n,docIds:i})}toggleSelected(e,n){n?this.selectedIds.add(e):this.selectedIds.delete(e),this._emit(`selection-changed`,{ids:[...this.selectedIds]})}get selectedCount(){return this.selectedIds.size}};var Z=new Er;function ge(r){if(r instanceof z)switch(r.status){case 401:return y(`errors.signIn`);case 403:return y(`errors.forbidden`);case 404:return y(`errors.notFound`);default:return r.message||y(`errors.generic`)}return r instanceof Error&&r.message?r.message:y(`errors.generic`)}function En(r){let e=r.shadowRoot,n=!1;function i(){oe(e.getElementById(`col-delete-error`)),xe(e,`col-delete-backdrop`,`col-delete-modal`,g)}function c(){let a=e.getElementById(`col-grid`);if(!a)return;let s=[...a.querySelectorAll(`.lq-col-card`)],h=s.length,x=s.filter(B=>B.dataset.role===`creator`||B.dataset.role===`owner`).length,z=s.filter(B=>B.dataset.role===`reader`).length;e.getElementById(`col-badge-all`).textContent=String(h),e.getElementById(`col-badge-mine`).textContent=String(x),e.getElementById(`col-badge-shared`).textContent=String(z),r._applyColFilters?.()}function l(a){let s=document.createElement(`div`);s.className=`lq-col-card`,s.dataset.id=a.id,s.dataset.role=a.currentUserRole;let h=a.tags.map(L=>`<span class="oc-tag oc-tag-size-xsmall oc-tag-grey"><span class="oc-tag-label">${L}</span></span>`).join(``),x=a.currentUserRole!==`reader`,z=x?`col-person`:`col-people`,B=x?`list.roleOwner`:`list.roleShared`,P=`<span class="oc-tag oc-tag-size-xsmall oc-tag-indigo">
          <span class="oc-tag-icon"><i data-icon="${z}"></i></span>
          <span class="oc-tag-label" data-i18n="${B}">${y(B)}</span>
        </span>`;s.innerHTML=`
      <div class="lq-col-card__header">
        <span class="lq-col-card__icon"><i data-icon="${a.icon}"></i></span>
        <div class="lq-col-card__meta">
          <div class="lq-col-card__title-row">
            <h5 class="lq-col-card__title">${a.name}</h5>
            <div class="lq-col-card__actions">
              ${x?`<button class="lq-btn lq-btn--tertiary-neutral lq-btn--sm lq-btn--icon lq-col-card__btn-del" data-i18n-attr="aria-label:list.deleteCollection" aria-label="Delete workspace">
                <i data-icon="col-trash"></i>
              </button>`:``}
              <label class="oc-checkbox-root lq-col-card__checkbox">
                <input type="checkbox" class="oc-checkbox-input lq-col-card__check-input">
                <span class="oc-checkbox-hitbox">
                  <span class="oc-checkbox-control">
                    <span class="oc-checkbox-icon oc-checkbox-icon-check"><i data-icon="checkbox-check"></i></span>
                    <span class="oc-checkbox-icon oc-checkbox-icon-minus"><i data-icon="checkbox-minus"></i></span>
                  </span>
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="lq-col-card__tags">${h}</div>
      <div class="lq-col-card__body">
        <p class="lq-col-card__desc">${a.desc}</p>
      </div>
      <div class="lq-col-card__sep"></div>
      <div class="lq-col-card__footer">
        ${P}
        <div class="lq-col-card__count">
          <i data-icon="col-file"></i>
          <span>${a.docs}</span>
        </div>
      </div>`;let M=s.querySelector(`.lq-col-card__btn-del`);return M&&(r._tooltip.attach(M,`common.delete`,`top`),M.addEventListener(`click`,()=>{ze(e.getElementById(`col-delete-desc`),a.name),e.getElementById(`btn-col-delete-confirm`)._targetCard=s,i()})),s.addEventListener(`click`,L=>{let C=L.target;C.closest(`.lq-col-card__btn-del`)||C.closest(`.lq-col-card__checkbox`)||e.getElementById(`col-grid`).classList.contains(`lq-col-grid--selecting`)||r._openColDetail(a)}),s}function f(){we(e,`col-delete-backdrop`,`col-delete-modal`),X(e.getElementById(`col-delete-modal-title`),`list.deleteTitle`),rr(e.getElementById(`col-delete-desc`))}function g(){n||f()}r._colGridBuilt=!1,r._colListBuilt=!1,r._colCurrentView=`grid`,Z.addEventListener(`collection-created`,a=>{let{collection:s}=a.detail;if(r._colGridBuilt){let h=e.getElementById(`col-grid`),x=l(s);h.appendChild(x),R(x),c()}r._colListBuilt=!1}),Z.addEventListener(`collection-updated`,a=>{let{collection:s}=a.detail;if(r._colGridBuilt){let x=e.getElementById(`col-grid`).querySelector(`.lq-col-card[data-id="${s.id}"]`);if(x){let z=l(s);x.replaceWith(z),R(z)}c()}r._colListBuilt=!1});function q(){let a=e.getElementById(`col-grid`),s=e.getElementById(`col-list`),h=r._colCurrentView===`list`;a.hidden=h||a.querySelectorAll(`.lq-col-card:not([hidden])`).length===0,s.hidden=!h||s.querySelectorAll(`.lq-col-row:not([hidden])`).length===0}async function V(){e.getElementById(`btn-detail-close`)?.click(),r._exitDocSelection?.(),r._closeColDocPreview?.(),e.getElementById(`col-detail-view`).hidden=!0;let a=e.getElementById(`collections-view`);if(a.hidden=!1,R(a),!r._colGridBuilt){let s=e.getElementById(`col-grid`),h=e.getElementById(`col-grid-loading`),x=e.getElementById(`col-grid-error`);s.hidden=!0,x.hidden=!0,h.hidden=!1;try{await Z.ensureLoaded()}catch(z){h.hidden=!0,e.getElementById(`col-grid-error-message`).textContent=ge(z),x.hidden=!1;return}h.hidden=!0,I()}q()}function I(){let a=e.getElementById(`col-grid`);a.innerHTML=``,Z.getAll().forEach(s=>a.appendChild(l(s))),R(a),r._colGridBuilt=!0,r._colListBuilt=r._colCurrentView===`list`,r._colListBuilt&&(d(),R(e.getElementById(`col-list`))),c()}async function H(){if(!r._colGridBuilt)return V();let a=e.getElementById(`col-refresh-error`);oe(a);try{await Z.reload()}catch(s){ue(a,y(`list.refreshError`,{error:ge(s)}));return}r._exitColSelection?.(),I()}e.getElementById(`col-grid-retry`).addEventListener(`click`,()=>{V()});function O(){r._exitDocSelection?.(),r._closeColDocPreview?.(),e.getElementById(`col-detail-view`).hidden=!0,e.getElementById(`collections-view`).hidden=!0}function $(a){let s=document.createElement(`div`);s.className=`lq-col-row`,s.dataset.id=a.id,s.dataset.role=a.currentUserRole;let h=a.tags.map(L=>`<span class="oc-tag oc-tag-size-xsmall oc-tag-grey"><span class="oc-tag-label">${L}</span></span>`).join(``),x=a.currentUserRole!==`reader`,z=x?`list.roleOwner`:`list.roleShared`,B=`<span class="oc-tag oc-tag-size-xsmall oc-tag-indigo">
          <span class="oc-tag-icon"><i data-icon="${x?`col-person`:`col-people`}"></i></span>
          <span class="oc-tag-label" data-i18n="${z}">${y(z)}</span>
         </span>`;s.innerHTML=`
      <div class="lq-col-row__cb">
        <label class="oc-checkbox-root lq-col-row__checkbox">
          <input type="checkbox" class="oc-checkbox-input lq-col-row__check-input">
          <span class="oc-checkbox-hitbox">
            <span class="oc-checkbox-control">
              <span class="oc-checkbox-icon oc-checkbox-icon-check"><i data-icon="checkbox-check"></i></span>
              <span class="oc-checkbox-icon oc-checkbox-icon-minus"><i data-icon="checkbox-minus"></i></span>
            </span>
          </span>
        </label>
      </div>
      <div class="lq-col-row__name">
        <span class="lq-col-row__icon"><i data-icon="${a.icon}"></i></span>
        <div class="lq-col-row__name-block">
          <span class="lq-col-row__title">${a.name}</span>
          <span class="lq-col-row__desc">${a.desc}</span>
        </div>
      </div>
      <div class="lq-col-row__content">
        <i data-icon="col-file"></i>
        <span>${a.docs}</span>
      </div>
      <div class="lq-col-row__owner">${B}</div>
      <div class="lq-col-row__date">\u2014</div>
      <div class="lq-col-row__tags">${h}</div>
      <div class="lq-col-row__actions">
        ${x?`<button class="lq-btn lq-btn--tertiary-neutral lq-btn--sm lq-btn--icon lq-col-row__btn-del" data-i18n-attr="aria-label:list.deleteCollection" aria-label="Delete workspace"><i data-icon="col-trash"></i></button>`:``}
      </div>`;let P=s.querySelector(`.lq-col-row__check-input`),M=s.querySelector(`.lq-col-row__btn-del`);return M&&(M.addEventListener(`click`,L=>{L.stopPropagation(),ze(e.getElementById(`col-delete-desc`),a.name),e.getElementById(`btn-col-delete-confirm`)._targetCard=s,i()}),r._tooltip.attach(M,`common.delete`,`top`)),P.addEventListener(`change`,()=>{s.classList.toggle(`lq-col-row--selected`,P.checked),r._updateColSelCount?.()}),s.addEventListener(`click`,L=>{let C=L.target;if(C.closest(`.lq-col-row__actions`))return;if(e.getElementById(`col-list`)?.classList.contains(`lq-col-list--selecting`)){if(C.closest(`.lq-col-row__checkbox`))return;P.checked=!P.checked,P.dispatchEvent(new Event(`change`,{bubbles:!0}));return}r._openColDetail(a)}),s}function d(){let a=e.getElementById(`col-list`);if(!a)return;a.innerHTML=``;let s=document.createElement(`div`);s.className=`lq-col-list-header`,s.innerHTML=`
      <div class="lq-col-list__hdr-cell lq-col-list__hdr-cb">
        <label class="oc-checkbox-root lq-col-list__select-all">
          <input type="checkbox" class="oc-checkbox-input" id="col-list-select-all">
          <span class="oc-checkbox-hitbox">
            <span class="oc-checkbox-control">
              <span class="oc-checkbox-icon oc-checkbox-icon-check"><i data-icon="checkbox-check"></i></span>
              <span class="oc-checkbox-icon oc-checkbox-icon-minus"><i data-icon="checkbox-minus"></i></span>
            </span>
          </span>
        </label>
      </div>
      <div class="lq-col-list__hdr-cell">Name</div>
      <div class="lq-col-list__hdr-cell lq-col-list__hdr-content">Content</div>
      <div class="lq-col-list__hdr-cell">Owner/Shared</div>
      <div class="lq-col-list__hdr-cell lq-col-list__hdr-date">Date Updated</div>
      <div class="lq-col-list__hdr-cell lq-col-list__hdr-tags">Tags</div>
      <div class="lq-col-list__hdr-cell"></div>`,a.appendChild(s),R(s),Z.getAll().forEach(h=>a.appendChild($(h))),e.getElementById(`col-list-select-all`).addEventListener(`click`,function(){let h=this.indeterminate?!0:this.checked;this.indeterminate=!1,this.checked=h,a.querySelectorAll(`.lq-col-row:not([hidden])`).forEach(x=>{let z=x.querySelector(`.lq-col-row__check-input`);z&&(z.checked=h,z.dispatchEvent(new Event(`change`,{bubbles:!0})))})})}(function(){let a=[...e.querySelectorAll(`#col-tab-all, #col-tab-mine, #col-tab-shared`)],s=`all`,h=``;function x(){let P=h.toLowerCase(),M=(k,t)=>{let o=s===`all`||s===`editor`&&(k.dataset.role===`creator`||k.dataset.role===`owner`)||s===`reader`&&k.dataset.role===`reader`,p=k.querySelector(t),b=(p?.dataset.rawText||p?.textContent||``).toLowerCase(),_=!P||b.includes(P);k.hidden=!(o&&_),p&&tr(p,_?h:``)},L=e.getElementById(`col-grid`);L&&L.querySelectorAll(`.lq-col-card`).forEach(k=>M(k,`.lq-col-card__title`));let C=e.getElementById(`col-list`);C&&C.querySelectorAll(`.lq-col-row`).forEach(k=>M(k,`.lq-col-row__title`)),q()}r._applyColFilters=x,a.forEach(P=>{P.addEventListener(`click`,()=>{a.forEach(M=>M.setAttribute(`aria-selected`,`false`)),P.setAttribute(`aria-selected`,`true`),s=P.dataset.filter||`all`,x()})});let z=e.getElementById(`col-search-input`),B=e.getElementById(`col-search-clear`);z.addEventListener(`input`,function(){h=this.value,B.classList.toggle(`visible`,h.length>0),x()}),B.addEventListener(`click`,()=>{z.value=``,h=``,B.classList.remove(`visible`),x(),z.focus()})})(),(function(){let a=e.getElementById(`col-select-btn`),s=e.getElementById(`col-selbar`),h=e.getElementById(`col-selbar-count`),x=e.getElementById(`col-sel-delete`),z=e.getElementById(`col-sel-all`),B=!1;function P(){return e.getElementById(r._colCurrentView===`list`?`col-list`:`col-grid`)}function M(){let t=P();return t?r._colCurrentView===`list`?[...t.querySelectorAll(`.lq-col-row`)]:[...t.querySelectorAll(`.lq-col-card`)]:[]}function L(){let o=M().filter(D=>!D.hidden),b=o.filter(D=>D.querySelector(`.lq-col-card__check-input, .lq-col-row__check-input`)?.checked).length;se(h,`list.selectedCount`,b),x.disabled=b===0;let _=o.length>0&&b===o.length;X(z,_?`common.unselectAll`:`common.selectAll`);let F=e.getElementById(`col-list-select-all`);F&&(b===0?(F.checked=!1,F.indeterminate=!1):b===o.length?(F.checked=!0,F.indeterminate=!1):(F.checked=!1,F.indeterminate=!0))}function C(){B=!0,X(a,`common.cancel`),e.getElementById(`col-grid`)?.classList.add(`lq-col-grid--selecting`),e.getElementById(`col-list`)?.classList.add(`lq-col-list--selecting`),s.hidden=!1,R(s),L()}function k(){B=!1,X(a,`common.select`),e.getElementById(`col-grid`)?.classList.remove(`lq-col-grid--selecting`),e.getElementById(`col-list`)?.classList.remove(`lq-col-list--selecting`),e.getElementById(`col-grid`)?.querySelectorAll(`.lq-col-card`).forEach(o=>{let p=o.querySelector(`.lq-col-card__check-input`);p&&(p.checked=!1),o.classList.remove(`lq-col-card--selected`)}),e.getElementById(`col-list`)?.querySelectorAll(`.lq-col-row`).forEach(o=>{let p=o.querySelector(`.lq-col-row__check-input`);p&&(p.checked=!1),o.classList.remove(`lq-col-row--selected`)}),s.hidden=!0;let t=e.getElementById(`col-list-select-all`);t&&(t.checked=!1,t.indeterminate=!1)}r._exitColSelection=k,r._updateColSelCount=L,a.addEventListener(`click`,()=>B?k():C()),e.getElementById(`col-grid`).addEventListener(`change`,t=>{let o=t.target;if(!o.classList.contains(`lq-col-card__check-input`))return;let p=o.closest(`.lq-col-card`);p&&p.classList.toggle(`lq-col-card--selected`,o.checked),L()}),e.getElementById(`col-grid`).addEventListener(`click`,t=>{if(!B)return;let o=t.target,p=o.closest(`.lq-col-card`);if(!p||o.closest(`.lq-col-card__checkbox`))return;let b=p.querySelector(`.lq-col-card__check-input`);b&&(b.checked=!b.checked,b.dispatchEvent(new Event(`change`,{bubbles:!0})))}),x.addEventListener(`click`,()=>{let t=M().filter(b=>b.querySelector(`.lq-col-card__check-input, .lq-col-row__check-input`)?.checked&&b.dataset.role!==`reader`);if(!t.length)return;let o=t.length;se(e.getElementById(`col-delete-modal-title`),`list.deleteCollectionsTitle`,o),ze(e.getElementById(`col-delete-desc`),pe(`list.collectionCount`,o));let p=e.getElementById(`btn-col-delete-confirm`);p._targetCard=null,p._bulkTargets=t,i()}),z.addEventListener(`click`,()=>{let t=M().filter(p=>!p.hidden),o=t.every(p=>p.querySelector(`.lq-col-card__check-input, .lq-col-row__check-input`)?.checked);t.forEach(p=>{let b=p.querySelector(`.lq-col-card__check-input, .lq-col-row__check-input`);b&&(b.checked=!o,b.dispatchEvent(new Event(`change`,{bubbles:!0})))})})})(),e.getElementById(`btn-col-delete-close`).addEventListener(`click`,g),e.getElementById(`btn-col-delete-cancel`).addEventListener(`click`,g),e.getElementById(`col-delete-backdrop`).addEventListener(`click`,g),e.getElementById(`btn-col-delete-confirm`).addEventListener(`click`,async function(){if(n)return;let a=this._bulkTargets,s=this._targetCard,h=this._detailCol,x=a?[...a]:s?[s]:[],z=new Set(x.map(M=>M.dataset.id||``));if(h&&z.add(h.id),!z.size)return;let B=e.getElementById(`btn-col-delete-confirm`),P=e.getElementById(`col-delete-error`);n=!0,oe(P),ae(B,!0,y(`common.deleting`));try{let{succeeded:M,failed:L}=await Z.remove([...z]),C=new Set(M),k=o=>{e.getElementById(`col-grid`)?.querySelector(`.lq-col-card[data-id="${o}"]`)?.remove(),e.getElementById(`col-list`)?.querySelector(`.lq-col-row[data-id="${o}"]`)?.remove()},t=new Map;if(x.forEach(o=>t.set(o.dataset.id||``,o.querySelector(`.lq-col-card__title, .lq-col-row__title`)?.textContent||``)),h&&t.set(h.id,h.name),x.filter(o=>C.has(o.dataset.id||``)).forEach(o=>k(o.dataset.id||``)),h&&C.has(h.id)&&k(h.id),c(),L.length){let o=L.map(p=>t.get(p.id)||p.id).join(`, `);if(ue(P,pe(`list.bulkDeleteFailed`,L.length,{names:o})),a){let p=a.filter(b=>!C.has(b.dataset.id||``));this._bulkTargets=p.length?p:null}s&&C.has(s.dataset.id||``)&&(this._targetCard=null),h&&C.has(h.id)&&(this._detailCol=null);return}a&&(this._bulkTargets=null,r._exitColSelection?.()),s&&(this._targetCard=null),h&&(r._closeColDetail(),this._detailCol=null),f()}catch(M){ue(P,ge(M))}finally{n=!1,ae(B,!1)}}),r._tooltip.attach(e.getElementById(`col-view-grid`),`common.gridView`,`bottom`),r._tooltip.attach(e.getElementById(`col-view-list`),`common.listView`,`bottom`),r._tooltip.attach(e.getElementById(`col-detail-view-grid`),`common.gridView`,`bottom`),r._tooltip.attach(e.getElementById(`col-detail-view-list`),`common.listView`,`bottom`),(function(){let a=e.getElementById(`col-view-grid`),s=e.getElementById(`col-view-list`);a.addEventListener(`click`,()=>{r._colCurrentView=`grid`,a.setAttribute(`aria-pressed`,`true`),s.setAttribute(`aria-pressed`,`false`),q(),r._updateColSelCount?.()}),s.addEventListener(`click`,()=>{r._colCurrentView=`list`;let h=e.getElementById(`col-list`);a.setAttribute(`aria-pressed`,`false`),s.setAttribute(`aria-pressed`,`true`),r._colListBuilt||(r._colListBuilt=!0,d()),R(h),r._applyColFilters?.(),r._updateColSelCount?.()})})(),r._showList=V,r._hideList=O,r._refreshList=H,r._buildCollectionCard=l,r._updateColTabCounts=c,r._closeColDeleteModal=g}var Lr;var Ln=!1;var zn;function Bn(){Ln||(Ln=!0,zn=pt().then(r=>Lr=r.userId?{id:r.userId,name:r.fullName||r.name}:void 0).catch(()=>{}))}function Ee(){return Bn(),Lr}function ar(){return Bn(),zn??Promise.resolve(Lr)}var Sn=`lexiq-collections:principal-name-cache`;function Ue(r){return r.isUser&&r.fullName||r.name}function zr(){try{let r=sessionStorage.getItem(Sn);return r?JSON.parse(r):{}}catch{return{}}}function qt(r){try{sessionStorage.setItem(Sn,JSON.stringify(r))}catch{}}function Br(r,e){let n=zr();n[r]=e,qt(n)}function Ct(r){let e=Ee();return e&&e.id===r?{name:e.name,isGroup:!1}:zr()[r]??null}async function In(r){let e=zr(),n=[...new Set(r)].filter(i=>i&&!e[i]);if(n.length)try{(await At(n)).forEach(c=>Br(c.userId,{name:Ue(c),isGroup:c.isGroup,email:c.isUser?c.email:void 0}))}catch{}}function Hn(r){let e=Ct(r);return{name:e?e.name:r,email:e?.email,isGroup:e?e.isGroup:!1,resolved:!!e,isSelf:Ee()?.id===r}}var Ie={reader:`share.reader`,owner:`share.owner`};function Et(r){let e=r.trim().split(/\s+/).filter(Boolean);return e.length?e.length===1?e[0].slice(0,2).toUpperCase():(e[0][0]+e[e.length-1][0]).toUpperCase():`?`}function Sr(r,e){return`<div class="oc-avatar oc-avatar-variant-primary oc-avatar-color-sage oc-avatar-size-small"><span class="oc-avatar-fallback">${e?`<span class="oc-avatar-icon"><i data-icon="group-people"></i></span>`:`<span class="oc-avatar-initials">${Et(r)}</span>`}</span></div>`}function ir(r){let{tagWrap:e,input:n,dropdown:i,roleWrap:c,roleBtn:l,roleLabel:f,roleDropdown:g}=r.elements,q=[],V=`reader`,I=[],H=-1,O=0;function $(){r.onChange?.()}function d(){[...e.children].forEach(t=>{t!==n&&t!==c&&t.remove()}),q.forEach((t,o)=>{let p=document.createElement(`span`);p.className=`oc-tag oc-tag-size-xsmall oc-tag-grey lq-tag-input__chip`;let b=document.createElement(`span`);if(b.className=`oc-tag-label`,b.textContent=t.name,p.appendChild(b),r.showChipRole){let F=t.role===`owner`?`share.changeRoleToReader`:`share.changeRoleToOwner`,D=document.createElement(`button`);D.type=`button`,D.className=`lq-tag-input__role`,D.dataset.index=String(o),D.dataset.action=`toggle-role`,D.dataset.i18n=Ie[t.role],D.dataset.i18nAttr=`aria-label:${F}`,D.dataset.i18nParams=Se({name:t.name}),D.textContent=y(Ie[t.role]),D.setAttribute(`aria-label`,y(F,{name:t.name})),p.appendChild(D)}let _=document.createElement(`button`);_.type=`button`,_.className=`lq-tag-input__remove`,_.dataset.index=String(o),_.dataset.action=`remove`,_.dataset.i18nAttr=`aria-label:share.removeUser`,_.dataset.i18nParams=Se({name:t.name}),_.setAttribute(`aria-label`,y(`share.removeUser`,{name:t.name})),_.innerHTML=`<i data-icon="chip-close"></i>`,p.appendChild(_),e.insertBefore(p,n)}),R(e),q.length?(n.dataset.i18nAttr=`aria-label:${r.ariaLabelKey}`,n.placeholder=``):(n.dataset.i18nAttr=`placeholder:${r.placeholderKey};aria-label:${r.ariaLabelKey}`,n.placeholder=y(r.placeholderKey))}function a(){let t=new Set([...q.map(o=>o.id),...r.excludeIds?.()??[]]);return I.filter(o=>!o.isGroup&&!t.has(o.userId))}function s(t,o=!1){H=-1,i.innerHTML=`<div class="lq-col-share-dropdown-status${o?` lq-col-share-dropdown-status--error`:``}">${K(t)}</div>`,i.hidden=!1,n.setAttribute(`aria-expanded`,`true`)}function h(){let t=a();if(!t.length){s(y(`share.noMatches`));return}i.innerHTML=t.map((o,p)=>{let b=Ue(o);return`<div class="lq-col-share-option${p===H?` lq-col-share-option--active`:``}" data-uid="${K(o.userId)}" id="lq-principal-opt-${p}" role="option" aria-selected="${p===H}" tabindex="-1">
        ${Sr(b,o.isGroup)}
        <div class="lq-col-share-option__info">
          <span class="lq-col-share-option__name">${K(b)}</span>
          <span class="lq-col-share-option-secondary">${K(o.longName)}</span>
        </div>
      </div>`}).join(``),R(i),i.hidden=!1,n.setAttribute(`aria-expanded`,`true`),x()}function x(){if(H<0){n.removeAttribute(`aria-activedescendant`);return}n.setAttribute(`aria-activedescendant`,`lq-principal-opt-${H}`),i.querySelector(`#lq-principal-opt-${H}`)?.scrollIntoView({block:`nearest`})}function z(t){let o=a().length;!o||i.hidden||(H=H===-1&&t<0?o-1:(H+t+o)%o,h())}async function B(t){let o=++O,p=t.trim();if(!p){M();return}s(y(`share.searching`));try{let{principals:b=[]}=await St$1({offset:0,limit:20,search:p});if(o!==O)return;b.forEach(_=>Br(_.userId,{name:Ue(_),isGroup:_.isGroup,email:_.isUser?_.email:void 0})),I=b,H=-1,h()}catch{o===O&&s(y(`share.searchFailed`),!0)}}let P=xn(t=>{B(t)},300);function M(){i.hidden=!0,H=-1,n.setAttribute(`aria-expanded`,`false`),n.removeAttribute(`aria-activedescendant`)}function L(t){let o=I.find(p=>p.userId===t);!o||q.some(p=>p.id===t)||(q.push({id:o.userId,name:Ue(o),isGroup:o.isGroup,role:V}),d(),n.value=``,M(),n.focus(),$())}function C(){if(!l||!f||!g)return;X(f,Ie[V]);let t=l.querySelector(`.lq-col-share-perm-icon`);t&&(t.innerHTML=`<i data-icon="${V===`owner`?`crown`:`eye`}"></i>`,R(t)),l.setAttribute(`aria-expanded`,`false`),[...g.querySelectorAll(`[data-role]`)].forEach(o=>{o.classList.toggle(`oc-list-item-selected`,o.dataset.role===V)})}function k(){!g||!l||(g.hidden=!0,l.setAttribute(`aria-expanded`,`false`))}return n.addEventListener(`input`,()=>{k(),P(n.value)}),n.addEventListener(`keydown`,t=>{switch(t.key){case`ArrowDown`:t.preventDefault(),z(1);break;case`ArrowUp`:t.preventDefault(),z(-1);break;case`Enter`:{if(i.hidden||H<0)return;t.preventDefault();let o=a()[H];o&&L(o.id);break}case`Escape`:(!i.hidden||g&&!g.hidden)&&(t.preventDefault(),t.stopPropagation(),M(),k());break;case`Backspace`:if(n.value||!q.length)return;q.pop(),d(),$()}}),i.addEventListener(`mousedown`,t=>{let o=t.target.closest(`.lq-col-share-option`);o&&(t.preventDefault(),L(o.dataset.uid))}),e.addEventListener(`click`,t=>{let o=t.target.closest(`[data-action]`);if(o){let p=Number(o.dataset.index),b=q[p];if(!b)return;o.dataset.action===`remove`?q.splice(p,1):b.role=b.role===`owner`?`reader`:`owner`,d(),$();return}l&&l.contains(t.target)||n.focus()}),l&&g&&(l.addEventListener(`mousedown`,t=>{t.preventDefault();let o=!g.hidden;g.hidden=o,M(),l.setAttribute(`aria-expanded`,String(!o))}),g.addEventListener(`mousedown`,t=>{let o=t.target.closest(`[data-role]`);o&&(t.preventDefault(),o.classList.add(`oc-list-item-pressed`),setTimeout(()=>{o.classList.remove(`oc-list-item-pressed`),V=o.dataset.role,C(),g.hidden=!0,n.focus()},150))})),C(),d(),{getEntries:()=>q,reset(){q=[],I=[],V=`reader`,n.value=``,C(),d(),M(),k()},closeDropdowns(){M(),k()},hasOpenDropdown:()=>!i.hidden||!!(g&&!g.hidden),focus:()=>n.focus()}}function Vn(r){return r.status===`uploading`?`tracker.stageUploading`:`tracker.stageIndexing`}function Lt(r){if(!r.status)return`<span class="lq-doc-card__date">${r.date||``}</span>`;if(r.status===`error`)return`<span class="lq-doc-card__date" data-i18n="tracker.uploadFailed">${y(`tracker.uploadFailed`)}</span>`;let e=Vn(r);return`<span class="lq-doc-status"><span class="lq-doc-status__label" data-i18n="${e}">${y(e)}</span><span class="lq-doc-status__dots"><span></span><span></span><span></span></span></span>`}function zt(r){if(!r.status)return`<span class="lq-doc-row__date">${r.date||``}</span>`;if(r.status===`error`)return`<span class="lq-doc-row__date" data-i18n="tracker.uploadFailed">${y(`tracker.uploadFailed`)}</span>`;let e=Vn(r);return`<span class="lq-doc-status lq-doc-status--row"><span class="lq-doc-status__label" data-i18n="${e}">${y(e)}</span><span class="lq-doc-status__dots"><span></span><span></span><span></span></span></span>`}function Mn(r){return r.uploadedBy?`<span class="oc-tag oc-tag-size-xsmall oc-tag-grey lq-doc-uploaded-tag">
              <span class="oc-tag-icon"><i data-icon="menu-upload"></i></span>
              <span class="oc-tag-label" data-i18n="detail.uploadedBy" data-i18n-params="${Se({name:r.uploadedBy})}">${K(y(`detail.uploadedBy`,{name:r.uploadedBy}))}</span>
            </span>`:`<span class="oc-tag oc-tag-size-xsmall oc-tag-grey">
              <span class="oc-tag-icon"><i data-icon="group-people"></i></span>
              <span class="oc-tag-label">${r.source||``}</span>
            </span>`}function Dn(r){let e=r.shadowRoot,n=!1;function i(){return r._currentCol?.currentUserRole===`reader`}function c(){n||we(e,`doc-delete-backdrop`,`doc-delete-modal`)}function l(d){let a=document.createElement(`div`);a.className=`lq-doc-card`,d._id&&(a.dataset.docId=d._id);a.innerHTML=`
      ${i()?``:`<button class="lq-btn lq-btn--tertiary-neutral lq-btn--sm lq-btn--icon lq-doc-card__btn-del" data-i18n-attr="aria-label:detail.deleteDocument" aria-label="Delete document"><i data-icon="col-trash"></i></button>`}
      <label class="oc-checkbox-root lq-doc-card__checkbox">
        <input type="checkbox" class="oc-checkbox-input lq-doc-card__check-input">
        <span class="oc-checkbox-hitbox">
          <span class="oc-checkbox-control">
            <span class="oc-checkbox-icon oc-checkbox-icon-check"><i data-icon="checkbox-check"></i></span>
            <span class="oc-checkbox-icon oc-checkbox-icon-minus"><i data-icon="checkbox-minus"></i></span>
          </span>
        </span>
      </label>
      <div class="lq-doc-card__icon"><i data-icon="col-doc-${d.type}"></i></div>
      <span class="lq-doc-card__name">${d.name}</span>
      <span class="lq-doc-card__size">${d.size||``}</span>
      <div class="lq-doc-card__sep"></div>
      <div class="lq-doc-card__footer">
        ${Mn(d)}
        ${Lt(d)}
      </div>`;let h=a.querySelector(`.lq-doc-card__btn-del`);return h&&r._tooltip.attach(h,`common.delete`,`top`),a}function f(d){let a=document.createElement(`div`);a.className=`lq-doc-row`,d._id&&(a.dataset.docId=d._id);let s=i();a.innerHTML=`
      <div class="lq-doc-row__cb">
        <label class="oc-checkbox-root">
          <input type="checkbox" class="oc-checkbox-input lq-doc-card__check-input">
          <span class="oc-checkbox-hitbox">
            <span class="oc-checkbox-control">
              <span class="oc-checkbox-icon oc-checkbox-icon-check"><i data-icon="checkbox-check"></i></span>
              <span class="oc-checkbox-icon oc-checkbox-icon-minus"><i data-icon="checkbox-minus"></i></span>
            </span>
          </span>
        </label>
      </div>
      <div class="lq-doc-row__name">
        <span class="lq-doc-row__icon"><i data-icon="col-doc-${d.type}"></i></span>
        <span class="lq-doc-card__name">${d.name}</span>
      </div>
      <div class="lq-doc-row__source">
        ${Mn(d)}
      </div>
      <span class="lq-doc-row__size">${d.size||``}</span>
      ${zt(d)}
      <div class="lq-doc-row__actions">
        ${s?``:`<button class="lq-btn lq-btn--tertiary-neutral lq-btn--sm lq-btn--icon lq-doc-card__btn-del" data-i18n-attr="aria-label:detail.deleteDocument" aria-label="Delete document"><i data-icon="col-trash"></i></button>`}
      </div>`;let h=a.querySelector(`.lq-doc-card__btn-del`);return h&&r._tooltip.attach(h,`common.delete`,`top`),a}function g(d){let a=e.getElementById(`col-detail-list`);a.innerHTML=``;let s=document.createElement(`div`);s.className=`lq-doc-list-header`,s.innerHTML=`
      <div class="lq-doc-list__hdr-cell lq-doc-list__hdr-cb">
        <label class="oc-checkbox-root lq-doc-list__select-all">
          <input type="checkbox" class="oc-checkbox-input" id="doc-list-select-all">
          <span class="oc-checkbox-hitbox">
            <span class="oc-checkbox-control">
              <span class="oc-checkbox-icon oc-checkbox-icon-check"><i data-icon="checkbox-check"></i></span>
              <span class="oc-checkbox-icon oc-checkbox-icon-minus"><i data-icon="checkbox-minus"></i></span>
            </span>
          </span>
        </label>
      </div>
      <div class="lq-doc-list__hdr-cell" data-i18n="detail.columnName">Name</div>
      <div class="lq-doc-list__hdr-cell lq-doc-list__hdr-source" data-i18n="detail.columnSource">Source</div>
      <div class="lq-doc-list__hdr-cell lq-doc-list__hdr-size" data-i18n="detail.columnSize">Size</div>
      <div class="lq-doc-list__hdr-cell lq-doc-list__hdr-date" data-i18n="detail.columnDate">Date</div>
      <div class="lq-doc-list__hdr-cell"></div>`,a.appendChild(s),d.forEach(h=>a.appendChild(f(h))),R(a),e.getElementById(`doc-list-select-all`).addEventListener(`click`,function(){let h=this.indeterminate?!0:this.checked;this.indeterminate=!1,this.checked=h,a.querySelectorAll(`.lq-doc-row`).forEach(x=>{let z=x.querySelector(`.lq-doc-card__check-input`);z&&(z.checked=h,z.dispatchEvent(new Event(`change`,{bubbles:!0})))})})}function q(){let d=e.getElementById(`col-detail-grid`),a=e.getElementById(`col-detail-list`),s=r._cdvCurrentView===`list`;d.hidden=s||d.querySelectorAll(`.lq-doc-card:not([hidden])`).length===0,a.hidden=!s||a.querySelectorAll(`.lq-doc-row:not([hidden])`).length===0}function V(){let d=r._cdvCurrentView===`list`?`#col-detail-list .lq-doc-row`:`#col-detail-grid .lq-doc-card`,a=e.querySelectorAll(d).length===0;e.getElementById(`col-detail-empty`).hidden=!a,e.getElementById(`col-detail-select-btn`).hidden=a||i(),q()}Z.addEventListener(`collection-updated`,d=>{let a=d.detail.collection,s=r._currentCol;if(!s||s.id!==a.id||e.getElementById(`col-detail-view`).hidden)return;r._currentCol=a;let h=a.currentUserRole===`reader`;if(e.getElementById(`col-detail-delete`).hidden=h,e.getElementById(`col-detail-edit`).hidden=h,e.getElementById(`cdv-more-delete`).hidden=h,e.getElementById(`cdv-more-edit`).hidden=h,e.getElementById(`col-detail-share`).hidden=h,e.getElementById(`cdv-more-share`).hidden=h,e.getElementById(`col-detail-upload`).hidden=h,h){r._exitDocSelection?.(),e.getElementById(`col-detail-select-btn`).hidden=!0;let x=e.getElementById(`col-detail-grid`);x.innerHTML=``,r._currentDocs.forEach(z=>x.appendChild(l(z))),R(x),r._cdvListBuilt=!1,e.getElementById(`col-detail-list`).innerHTML=``,r._cdvCurrentView===`list`&&r._buildDocListView(r._currentDocs),V()}});async function I(d){r._exitDocSelection?.(),r._closeColDocPreview?.(),r._resetDetailSearch?.(),r._currentCol=d;let a=e.getElementById(`col-detail-view`);e.getElementById(`col-detail-title`).textContent=d.name,e.getElementById(`col-detail-desc`).textContent=d.desc;let s=e.getElementById(`col-detail-tags`);d.tags.length?(s.innerHTML=`<i data-icon="col-tags-label"></i> ${d.tags.join(`, `)}`,s.hidden=!1):s.hidden=!0;let h=d.currentUserRole===`reader`;e.getElementById(`col-detail-delete`).hidden=h,e.getElementById(`col-detail-edit`).hidden=h,e.getElementById(`cdv-more-delete`).hidden=h,e.getElementById(`cdv-more-edit`).hidden=h,e.getElementById(`col-detail-share`).hidden=h,e.getElementById(`cdv-more-share`).hidden=h,e.getElementById(`col-detail-upload`).hidden=h;let x=e.getElementById(`col-detail-delete`);x.onclick=()=>{X(e.getElementById(`col-delete-modal-title`),`list.deleteTitle`),ze(e.getElementById(`col-delete-desc`),d.name),e.getElementById(`btn-col-delete-confirm`)._detailCol=d,oe(e.getElementById(`col-delete-error`)),xe(e,`col-delete-backdrop`,`col-delete-modal`,r._closeColDeleteModal)},r._cdvListBuilt=!1,r._cdvCurrentView=`grid`,e.getElementById(`col-detail-view-grid`).setAttribute(`aria-pressed`,`true`),e.getElementById(`col-detail-view-list`).setAttribute(`aria-pressed`,`false`);let z=e.getElementById(`col-detail-grid`),B=e.getElementById(`col-detail-list`),P=e.getElementById(`col-detail-docs-loading`),M=e.getElementById(`col-detail-docs-error`);z.hidden=!0,B.hidden=!0,e.getElementById(`col-detail-empty`).hidden=!0,e.getElementById(`col-detail-select-btn`).hidden=!0,M.hidden=!0,oe(e.getElementById(`col-detail-refresh-error`)),P.hidden=!1,rr(e.getElementById(`col-detail-count`)),e.getElementById(`collections-view`).hidden=!0,a.hidden=!1,R(a);let L;try{L=await Z.loadDocuments(d.id)}catch(C){P.hidden=!0,e.getElementById(`col-detail-docs-error-message`).textContent=ge(C),M.hidden=!1,R(M);return}r._currentCol===d&&(P.hidden=!0,H(L))}function H(d){r._currentDocs=d,se(e.getElementById(`col-detail-count`),`detail.fileCount`,d.length),d.some(s=>s.status===`uploading`||s.status===`indexing`)&&r._startUploadPolling?.();let a=e.getElementById(`col-detail-grid`);a.innerHTML=``,d.forEach(s=>{let h=l(s);a.appendChild(h)}),R(a),e.getElementById(`col-detail-list`).innerHTML=``,r._cdvListBuilt=r._cdvCurrentView===`list`,r._cdvListBuilt&&g(d),e.getElementById(`col-detail-select-btn`).hidden=i(),V()}e.getElementById(`col-detail-docs-retry`).addEventListener(`click`,()=>{r._currentCol&&I(r._currentCol)});function O(){r._exitDocSelection?.(),r._closeColDocPreview?.(),e.getElementById(`col-detail-view`).hidden=!0,e.getElementById(`collections-view`).hidden=!1,r._refreshList?.()}e.getElementById(`col-detail-back`).addEventListener(`click`,O);let $=()=>{};(function(){let d=e.getElementById(`col-detail-search`),a=e.getElementById(`col-detail-search-clear`),s=d.closest(`.oc-sb`);function h(x){let z=x.toLowerCase(),B=(L,C)=>{let k=L.querySelector(C),t=(k?.dataset.rawText||k?.textContent||``).toLowerCase(),o=!x||t.includes(z);L.hidden=!o,k&&tr(k,o?x:``)},P=e.getElementById(`col-detail-grid`);P&&P.querySelectorAll(`.lq-doc-card`).forEach(L=>B(L,`.lq-doc-card__name`));let M=e.getElementById(`col-detail-list`);M&&M.querySelectorAll(`.lq-doc-row`).forEach(L=>B(L,`.lq-doc-row__name`)),q()}d.addEventListener(`input`,()=>{let x=d.value;s?.classList.toggle(`oc-sb--empty`,x===``),a.classList.toggle(`visible`,x!==``),h(x)}),a.addEventListener(`click`,()=>{d.value=``,s?.classList.add(`oc-sb--empty`),a.classList.remove(`visible`),h(``),d.focus()}),r._resetDetailSearch=()=>{d.value=``,s?.classList.add(`oc-sb--empty`),a.classList.remove(`visible`)},$=()=>h(d.value)})(),(function(){let d=e.getElementById(`col-detail-refresh`),a=e.getElementById(`col-detail-refresh-error`);r._tooltip.attach(d,`common.refresh`,`bottom`);async function s(){let h=r._currentCol;if(!h)return;oe(a),ae(d,!0);let x;try{x=await Z.loadDocuments(h.id)}catch(z){r._currentCol===h&&ue(a,y(`detail.refreshError`,{error:ge(z)}));return}finally{ae(d,!1)}r._currentCol===h&&(r._exitDocSelection?.(),r._closeColDocPreview?.(),H(x),$())}d.addEventListener(`click`,()=>{s()})})(),(function(){let d=[],a=`edit`,s=ir({elements:{tagWrap:e.getElementById(`col-edit-share-wrap`),input:e.getElementById(`col-edit-share-input`),dropdown:e.getElementById(`col-edit-share-dropdown`),roleWrap:e.querySelector(`#col-edit-share-wrap .lq-col-share-perm-wrap`),roleBtn:e.getElementById(`col-edit-share-perm-btn`),roleLabel:e.getElementById(`col-edit-share-perm-label`),roleDropdown:e.getElementById(`col-edit-share-perm-dropdown`)},placeholderKey:`share.searchPlaceholder`,ariaLabelKey:`share.searchUsers`,showChipRole:!0,excludeIds:()=>[Ee()?.id].filter(o=>!!o)});function h(){let o=s.getEntries();return{owners:o.filter(p=>p.role===`owner`).map(p=>p.id),readers:o.filter(p=>p.role===`reader`).map(p=>p.id)}}let x=!1;function z(){let o=e.getElementById(`col-edit-tag-wrap`),p=e.getElementById(`col-edit-tags-input`);[...o.children].forEach(b=>{b!==p&&b.remove()}),d.forEach((b,_)=>{let F=document.createElement(`span`);F.className=`oc-tag oc-tag-size-xsmall oc-tag-grey lq-tag-input__chip`;let D=document.createElement(`span`);D.className=`oc-tag-label`,D.textContent=b;let W=document.createElement(`button`);W.type=`button`,W.className=`lq-tag-input__remove`,W.dataset.i18nAttr=`aria-label:edit.removeTag`,W.dataset.i18nParams=JSON.stringify({tag:b}),W.setAttribute(`aria-label`,y(`edit.removeTag`,{tag:b})),W.dataset.index=String(_),W.innerHTML=`<i data-icon="chip-close"></i>`,F.appendChild(D),F.appendChild(W),o.insertBefore(F,p)}),R(o),d.length?(p.dataset.i18nAttr=`aria-label:edit.addTag`,p.placeholder=``):(p.dataset.i18nAttr=`placeholder:edit.tagsPlaceholder;aria-label:edit.addTag`,p.placeholder=y(`edit.tagsPlaceholder`))}function B(){let o=e.getElementById(`col-edit-desc`),p=e.getElementById(`col-edit-desc-counter`),b=e.getElementById(`col-edit-desc-wrap`),_=o.value.length;p.textContent=_+`/300`,p.classList.toggle(`oc-input-counter-error`,_>300),b.classList.toggle(`oc-input-scheme-error`,_>300)}function P(o){a=o,e.getElementById(`col-edit-share-field`).hidden=o===`edit`,X(e.getElementById(`col-edit-modal-title`),o===`add`?`edit.addTitle`:`edit.editTitle`),X(e.getElementById(`btn-col-edit-save`),o===`add`?`common.create`:`common.save`)}function M(o){P(`edit`),e.getElementById(`col-edit-title`).value=o.name,e.getElementById(`col-edit-desc`).value=o.desc,B(),d=[...o.tags],z(),s.reset(),oe(e.getElementById(`col-edit-error`)),xe(e,`col-edit-backdrop`,`col-edit-modal`,k),requestAnimationFrame(()=>{let p=e.getElementById(`col-edit-title`);p.focus(),p.select()})}function L(){P(`add`),e.getElementById(`col-edit-title`).value=``,e.getElementById(`col-edit-desc`).value=``,B(),d=[],z(),s.reset(),e.getElementById(`col-edit-title-wrap`).classList.remove(`oc-input-scheme-error`),e.getElementById(`col-edit-title-hint`).hidden=!0,oe(e.getElementById(`col-edit-error`)),xe(e,`col-edit-backdrop`,`col-edit-modal`,k),requestAnimationFrame(()=>e.getElementById(`col-edit-title`).focus())}function C(){x||(s.closeDropdowns(),we(e,`col-edit-backdrop`,`col-edit-modal`))}function k(){if(s.hasOpenDropdown()){s.closeDropdowns();return}C()}r.openAddCollectionModal=L;let t=e.getElementById(`col-edit-tags-input`);t.addEventListener(`keydown`,o=>{if(o.key===`Backspace`&&t.value===``&&d.length>0)d.pop(),z();else if(o.key===`Enter`){o.preventDefault();let p=t.value.trim();p&&(d.push(p),t.value=``,z())}}),t.addEventListener(`input`,()=>{let o=t.value,p=o.indexOf(`,`);if(p!==-1){let b=o.slice(0,p).trim();t.value=o.slice(p+1),b&&(d.push(b),z())}}),e.getElementById(`col-edit-tag-wrap`).addEventListener(`click`,o=>{let b=o.target.closest(`.lq-tag-input__remove`);if(b){d.splice(Number(b.dataset.index),1),z();return}t.focus()}),e.getElementById(`col-edit-title`).addEventListener(`input`,()=>{e.getElementById(`col-edit-title-wrap`).classList.remove(`oc-input-scheme-error`),e.getElementById(`col-edit-title-hint`).hidden=!0}),e.getElementById(`col-edit-desc`).addEventListener(`input`,B),e.getElementById(`btn-col-edit-close`).addEventListener(`click`,C),e.getElementById(`btn-col-edit-cancel`).addEventListener(`click`,C),e.getElementById(`col-edit-backdrop`).addEventListener(`click`,C),e.getElementById(`btn-col-edit-save`).addEventListener(`click`,async()=>{if(x)return;let o=t.value.trim();o&&(d.push(o),t.value=``);let p=e.getElementById(`col-edit-title`),b=p.value.trim(),_=e.getElementById(`col-edit-desc`).value.trim();if(!b){e.getElementById(`col-edit-title-wrap`).classList.add(`oc-input-scheme-error`),e.getElementById(`col-edit-title-hint`).hidden=!1,p.focus();return}let F=e.getElementById(`btn-col-edit-save`),D=e.getElementById(`col-edit-error`);x=!0,oe(D),ae(F,!0,y(a===`add`?`edit.creating`:`edit.saving`));try{if(a===`add`){let{owners:W,readers:re}=h(),Y=await ar(),de=Y&&!W.includes(Y.id)?[...W,Y.id]:W,ce=await Z.create({name:b,desc:_,tags:[...d],owners:de,readers:re});we(e,`col-edit-backdrop`,`col-edit-modal`),I(ce),r.dispatchEvent(new CustomEvent(`lexiq-collections:collection-created`,{bubbles:!0,composed:!0,detail:{collection:ce}}))}else{let W=r._currentCol;if(!W)return;let re=await Z.update(W.id,{name:b,description:_,tags:[...d]});if(!re)return;r._currentCol=re,e.getElementById(`col-detail-title`).textContent=b,e.getElementById(`col-detail-desc`).textContent=_;let Y=e.getElementById(`col-detail-tags`);re.tags.length?(Y.innerHTML=`<i data-icon="col-tags-label"></i> ${re.tags.join(`, `)}`,Y.hidden=!1,R(Y)):Y.hidden=!0,we(e,`col-edit-backdrop`,`col-edit-modal`),r.dispatchEvent(new CustomEvent(`lexiq-collections:collection-updated`,{bubbles:!0,composed:!0,detail:{collection:re}}))}}catch(W){ue(D,ge(W))}finally{x=!1,ae(F,!1)}}),document.addEventListener(`click`,o=>{if(e.getElementById(`col-edit-modal`).hidden)return;let p=e.getElementById(`col-edit-share-field`);o.composedPath().includes(p)||s.closeDropdowns()}),e.getElementById(`col-detail-edit`).addEventListener(`click`,()=>{r._currentCol&&M(r._currentCol)}),e.getElementById(`btn-add-collection`).addEventListener(`click`,L)})(),(function(){let d=e.getElementById(`col-detail-view-grid`),a=e.getElementById(`col-detail-view-list`);d.addEventListener(`click`,()=>{r._exitDocSelection?.(),r._cdvCurrentView=`grid`,d.setAttribute(`aria-pressed`,`true`),a.setAttribute(`aria-pressed`,`false`),q(),r._syncColDocPreviewView?.()}),a.addEventListener(`click`,()=>{r._exitDocSelection?.(),r._cdvCurrentView=`list`,d.setAttribute(`aria-pressed`,`false`),a.setAttribute(`aria-pressed`,`true`),r._cdvListBuilt||(r._cdvListBuilt=!0,g(r._currentDocs)),q(),r._syncColDocPreviewView?.()})})(),(function(){let d=e.getElementById(`col-detail-select-btn`),a=e.getElementById(`col-detail-selbar`),s=e.getElementById(`col-detail-sel-delete`),h=e.getElementById(`col-detail-sel-all`),x=!1,z=0;function B(){return r._cdvCurrentView===`list`?[...e.getElementById(`col-detail-list`).querySelectorAll(`.lq-doc-row`)]:[...e.getElementById(`col-detail-grid`).querySelectorAll(`.lq-doc-card`)]}function P(){let C=B(),k=C.filter(o=>o.querySelector(`.lq-doc-card__check-input`)?.checked).length;se(e.getElementById(`col-detail-count`),`detail.selectedDocumentCount`,k),s.disabled=k===0,X(h,C.length>0&&k===C.length?`common.unselectAll`:`common.selectAll`);let t=e.getElementById(`doc-list-select-all`);t&&(t.checked=k>0&&k===C.length,t.indeterminate=k>0&&k<C.length)}function M(){x=!0,z=B().length,X(d,`common.cancel`),e.getElementById(`col-detail-grid`).classList.add(`lq-cdv-grid--selecting`),e.getElementById(`col-detail-list`).classList.add(`lq-cdv-list--selecting`),a.hidden=!1,R(a),P()}function L(){x&&(x=!1,X(d,`common.select`),e.getElementById(`col-detail-grid`).classList.remove(`lq-cdv-grid--selecting`),e.getElementById(`col-detail-list`).classList.remove(`lq-cdv-list--selecting`),B().forEach(C=>{let k=C.querySelector(`.lq-doc-card__check-input`);k&&(k.checked=!1),C.classList.remove(`lq-doc-card--selected`)}),a.hidden=!0,s.disabled=!0,se(e.getElementById(`col-detail-count`),`detail.fileCount`,z))}r._exitDocSelection=L,d.addEventListener(`click`,()=>x?L():M()),e.getElementById(`col-detail-grid`).addEventListener(`change`,C=>{let k=C.target;if(!k.classList.contains(`lq-doc-card__check-input`))return;let t=k.closest(`.lq-doc-card`);t&&t.classList.toggle(`lq-doc-card--selected`,k.checked),P()}),e.getElementById(`col-detail-grid`).addEventListener(`click`,C=>{if(!x)return;let k=C.target,t=k.closest(`.lq-doc-card`);if(!t||k.closest(`.lq-doc-card__checkbox`)||k.closest(`.lq-doc-card__btn-del`))return;let o=t.querySelector(`.lq-doc-card__check-input`);o&&(o.checked=!o.checked,o.dispatchEvent(new Event(`change`,{bubbles:!0})))}),e.getElementById(`col-detail-list`).addEventListener(`change`,C=>{let k=C.target;if(!k.classList.contains(`lq-doc-card__check-input`))return;let t=k.closest(`.lq-doc-row`);t&&t.classList.toggle(`lq-doc-card--selected`,k.checked),P()}),e.getElementById(`col-detail-list`).addEventListener(`click`,C=>{if(!x)return;let k=C.target,t=k.closest(`.lq-doc-row`);if(!t||k.closest(`.lq-doc-row__cb`)||k.closest(`.lq-doc-card__btn-del`))return;let o=t.querySelector(`.lq-doc-card__check-input`);o&&(o.checked=!o.checked,o.dispatchEvent(new Event(`change`,{bubbles:!0})))}),h.addEventListener(`click`,()=>{let C=B(),k=C.every(t=>t.querySelector(`.lq-doc-card__check-input`)?.checked);C.forEach(t=>{let o=t.querySelector(`.lq-doc-card__check-input`);o&&(o.checked=!k,o.dispatchEvent(new Event(`change`,{bubbles:!0})))})}),s.addEventListener(`click`,()=>{let C=B().filter(t=>t.querySelector(`.lq-doc-card__check-input`)?.checked),k=C.length;k&&(se(e.getElementById(`doc-delete-title`),`detail.deleteDocumentsTitle`,k),ze(e.getElementById(`doc-delete-desc`),pe(`detail.documentCount`,k)),e.getElementById(`btn-doc-delete-confirm`)._targets=C,oe(e.getElementById(`doc-delete-error`)),xe(e,`doc-delete-backdrop`,`doc-delete-modal`,c))}),e.getElementById(`btn-doc-delete-close`).addEventListener(`click`,c),e.getElementById(`btn-doc-delete-cancel`).addEventListener(`click`,c),e.getElementById(`doc-delete-backdrop`).addEventListener(`click`,c),e.getElementById(`btn-doc-delete-confirm`).addEventListener(`click`,async function(){if(n)return;let C=this._targets||[],k=C.map(p=>p.dataset.docId).filter(p=>!!p),t=e.getElementById(`btn-doc-delete-confirm`),o=e.getElementById(`doc-delete-error`);n=!0,oe(o),ae(t,!0,y(`common.deleting`));try{k.length&&r._currentCol&&await Z.removeDocuments(r._currentCol.id,k),C.forEach(p=>p.remove()),this._targets=null,z=B().length,we(e,`doc-delete-backdrop`,`doc-delete-modal`),L(),se(e.getElementById(`col-detail-count`),`detail.fileCount`,z),V()}catch(p){ue(o,ge(p))}finally{n=!1,ae(t,!1)}})})(),(function(){function d(a){let h=a.target.closest(`.lq-doc-card__btn-del`);if(!h)return;a.stopPropagation();let x=h.closest(`.lq-doc-card`)||h.closest(`.lq-doc-row`);x&&(X(e.getElementById(`doc-delete-title`),`detail.deleteDocTitle`),ze(e.getElementById(`doc-delete-desc`),x.querySelector(`.lq-doc-card__name`).textContent||``),e.getElementById(`btn-doc-delete-confirm`)._targets=[x],oe(e.getElementById(`doc-delete-error`)),xe(e,`doc-delete-backdrop`,`doc-delete-modal`,c))}e.getElementById(`col-detail-grid`).addEventListener(`click`,d),e.getElementById(`col-detail-list`).addEventListener(`click`,d)})(),(function(){let d=e.getElementById(`cdv-more-btn`),a=e.getElementById(`cdv-more-menu`);if(!d||!a)return;function s(){let x=d.getBoundingClientRect();a.style.top=x.bottom+4+`px`,a.style.left=Math.max(4,x.right-200)+`px`,a.hidden=!1,R(a)}function h(){a.hidden=!0}d.addEventListener(`click`,x=>{x.stopPropagation(),a.hidden?s():h()}),document.addEventListener(`click`,x=>{let z=x.composedPath();!a.hidden&&!z.includes(a)&&!z.includes(d)&&h()}),e.getElementById(`cdv-more-share`).addEventListener(`click`,()=>{h(),e.getElementById(`col-detail-share`).click()}),e.getElementById(`cdv-more-edit`).addEventListener(`click`,()=>{h(),e.getElementById(`col-detail-edit`).click()}),e.getElementById(`cdv-more-refresh`).addEventListener(`click`,()=>{h(),e.getElementById(`col-detail-refresh`).click()}),e.getElementById(`cdv-more-delete`).addEventListener(`click`,()=>{h(),e.getElementById(`col-detail-delete`).click()})})(),r._openColDetail=I,r._closeColDetail=O,r._refreshCdvEmpty=V,r._buildDocCard=l,r._buildDocListView=g}function Bt(){let r=M.backendUrl;if(r)return new URL(`${r.replace(/\/+$/,``)}/`,window.location.href).href}function lr(r){let e=Bt();return e?new URL(r.replace(/^\/+/,``),e):new URL(r,window.location.href)}var St=`_query`;var He=[{content:`<h1>World Health Organization — Cardiovascular Disease Report 2024</h1><p>Cardiovascular diseases (CVDs) are the leading cause of death globally, taking an estimated 17.9 million lives each year. CVDs are a group of disorders of the heart and blood vessels and include coronary heart disease, cerebrovascular disease, rheumatic heart disease and other conditions.</p><p>More than four out of five CVD deaths are due to heart attacks and strokes, and one third of these deaths occur prematurely in people under 70 years of age.</p><h2>Key Facts</h2><ul><li>CVDs are the number 1 cause of death globally, representing 32% of all global deaths.</li><li>An estimated 17.9 million people died from CVDs in 2019.</li><li>85% of all CVD deaths are due to heart attack and stroke.</li><li>Over three quarters of CVD deaths take place in low- and middle-income countries.</li></ul>`},{content:`<h2>1. Behavioural Risk Factors</h2><p>The most important behavioural risk factors of heart disease and stroke are unhealthy diet, physical inactivity, tobacco use and harmful use of alcohol. The effects of behavioural risk factors may show up in individuals as raised blood pressure, raised blood glucose, raised blood lipids, and overweight and obesity.</p><h3>1.1 Tobacco Use</h3><p>Smoking remains one of the most powerful risk factors for cardiovascular disease. Exposure to tobacco smoke — including secondhand smoke — significantly increases the risk of coronary artery disease and stroke.</p><h3>1.2 Physical Inactivity</h3><p>Insufficient physical activity is estimated to cause 6% of the burden of coronary heart disease and 7% of type 2 diabetes. Regular moderate-intensity physical activity reduces the risk of heart disease, stroke and type 2 diabetes.</p><ul><li>Adults should do at least 150–300 minutes of moderate aerobic physical activity per week.</li><li>Reducing sedentary behavior further lowers cardiovascular risk.</li></ul>`},{content:`<h2>2. Raised Blood Pressure</h2><p>Raised blood pressure (hypertension) is the leading risk factor for cardiovascular disease worldwide. High blood pressure greatly increases the risk of heart attack, stroke and kidney failure. The condition often has no symptoms and can go undetected for years.</p><p>Globally, an estimated 1.28 billion adults aged 30–79 years have hypertension, most living in low- and middle-income countries. Only 1 in 5 adults with hypertension have it under control.</p><h3>2.1 Cholesterol and Dyslipidaemia</h3><p>Elevated cholesterol levels increase the risk of heart disease and stroke. Lowering blood cholesterol with statins reduces the risk of heart attacks and deaths from CVD in people who are at high risk.</p><h3>2.2 Diabetes</h3><p>People with diabetes are 2–4 times more likely to develop cardiovascular disease. Poorly controlled blood glucose accelerates atherosclerosis and damages blood vessel walls.</p>`},{content:`<h2>3. Global and Regional Burden</h2><p>Low- and middle-income countries disproportionately bear the burden of cardiovascular disease. In these countries, cardiovascular diseases often occur in younger populations, leading to productive life years lost.</p><h3>3.1 Europe and Central Asia</h3><p>Eastern Europe continues to record some of the world's highest rates of cardiovascular mortality, particularly in men. Factors include high rates of tobacco use, excessive alcohol consumption and limited access to preventive care.</p><h3>3.2 Sub-Saharan Africa</h3><p>While infectious diseases remain dominant, the burden of non-communicable diseases including CVD is rising rapidly. Urbanization, dietary changes, and reduced physical activity are key drivers of this shift.</p><ul><li>Rheumatic heart disease is particularly prevalent in children and young adults in Sub-Saharan Africa.</li><li>Stroke mortality rates are among the highest globally in parts of West Africa.</li></ul>`},{content:`<h2>4. Prevention Approaches</h2><p>Many CVDs can be prevented by addressing behavioural risk factors such as tobacco use, unhealthy diet, obesity, physical inactivity and harmful use of alcohol using population-wide strategies.</p><h3>4.1 Population-Level Interventions</h3><p>Effective population-level policies include tobacco taxation and smoke-free legislation, food reformulation to reduce salt content, trans-fat elimination, and restrictions on marketing of unhealthy foods to children.</p><h3>4.2 Individual-Level Prevention</h3><p>For individuals at high cardiovascular risk, a combination of medication, counselling and lifestyle modification can significantly reduce the probability of heart attack and stroke. Essential medicines include aspirin, beta-blockers, ACE inhibitors and statins.</p>`},{content:`<h2>5. Health System Response</h2><p>Early detection and treatment of people with cardiovascular risk through primary health care programmes is essential to reduce morbidity and mortality from CVD. Strong health systems with equitable access to medicines, diagnostics and clinical services are the cornerstone of a comprehensive CVD response.</p><h3>5.1 Essential Medicines</h3><p>WHO's Model List of Essential Medicines includes medicines for acute and long-term management of CVD. These include anticoagulants, antihypertensives, thrombolytics, diuretics and lipid-lowering agents.</p><h3>5.2 Task Sharing</h3><p>Non-physician health workers can identify and manage patients with high cardiovascular risk in community settings, improving access in areas where physicians are scarce.</p>`},{content:`<h2>6. Cardiac Rehabilitation</h2><p>Cardiac rehabilitation is a medically supervised program designed to help improve the cardiovascular health of patients who have experienced a heart attack, heart failure, angioplasty or stenting, or heart surgery. Structured programmes reduce hospital readmissions and improve quality of life.</p><h3>6.1 Components of Rehabilitation</h3><p>Core components include medical evaluation and exercise testing, physical activity counselling, nutritional guidance, psychological support and smoking cessation programmes.</p><h3>6.2 Evidence Base</h3><p>Meta-analyses confirm that cardiac rehabilitation reduces cardiovascular mortality by approximately 25% and all-cause mortality by 13%. Despite the evidence, access to rehabilitation remains limited in low- and middle-income countries.</p>`},{content:`<h2>7. Digital Health and Innovation</h2><p>Digital health technologies are transforming cardiovascular care. Wearable devices, remote monitoring, artificial intelligence-based diagnostics and electronic health records offer new opportunities for earlier detection, personalised treatment and better adherence monitoring.</p><h3>7.1 Artificial Intelligence</h3><p>Machine learning algorithms have demonstrated capability to detect atrial fibrillation, predict adverse cardiovascular events and identify patients at risk from routine ECG data and retinal photographs.</p><h3>7.2 Telemedicine</h3><p>Remote consultation and monitoring have accelerated since the COVID-19 pandemic. Telemedicine platforms now support medication management, follow-up consultations and real-time blood pressure monitoring in home settings.</p>`},{content:`<h2>8. Policy Recommendations</h2><p>WHO recommends a comprehensive set of policy actions for governments to reduce the burden of cardiovascular disease. These span regulatory, fiscal, health system and community-level domains and are grounded in evidence from high-, middle- and low-income settings.</p><h3>8.1 Regulatory Measures</h3><p>Governments should eliminate industrially produced trans-fatty acids from the food supply and establish clear labelling requirements for saturated fat, sodium and added sugars.</p><h3>8.2 Tobacco and Alcohol Control</h3><p>Raising taxes on tobacco products to at least 75% of retail price is among the most cost-effective public health measures. Alcohol control measures including minimum unit pricing and advertising restrictions should be strengthened.</p>`},{content:`<h2>9. Conclusions and Future Directions</h2><p>Despite progress in some high-income countries, cardiovascular disease remains a leading cause of preventable death worldwide. Achieving global targets for reducing premature mortality from CVD by one third by 2030 requires sustained political commitment, scaled-up financing and multisectoral action.</p><h3>9.1 Research Priorities</h3><p>Key gaps in evidence include understanding heterogeneity of CVD risk across populations, optimal treatment strategies in low-resource settings, and long-term effectiveness of digital health interventions.</p><h3>9.2 Call to Action</h3><p>Governments, health systems, civil society, the private sector and individuals each have a role to play. Strengthening intersectoral collaboration and maintaining accountability through monitoring frameworks are essential to delivering on global commitments.</p>`}];function Tn(r){let e=r.shadowRoot,n=e.getElementById(`col-doc-preview`),i=e.getElementById(`col-doc-resize-handle`),c=e.getElementById(`btn-cdp-close`),l=e.getElementById(`cdp-preview-pages`),f=e.getElementById(`cdp-preview-body`),g=e.getElementById(`cdp-zoom-in`),q=e.getElementById(`cdp-zoom-out`),V=e.getElementById(`cdp-page-current`),I=e.getElementById(`cdp-page-total`),H=e.getElementById(`cdp-prev-page`),O=e.getElementById(`cdp-next-page`),$=e.getElementById(`cdp-page-nav`),d=e.getElementById(`cdp-preview-link`),a=e.getElementById(`cdp-passages-sidebar`),s=e.getElementById(`cdp-passages-list`),h=e.getElementById(`cdp-passages-collapse`),x=e.getElementById(`cdp-passages-expand`),z=.1,B=.25,P=2.5,M=.75,L=null,C=-1,k=null,t=0;function o(){l.innerHTML=He.map((v,S)=>{let U=S+1;return`<div class="lq-dp-doc-preview__page" data-page="${U}">${v.content}<span class="lq-dp-doc-preview__page-num">${U} / ${He.length}</span></div>`}).join(``),I.textContent=String(He.length)}function p(v){M=Math.max(B,Math.min(P,v)),l.style.setProperty(`zoom`,String(M)),q.disabled=M<=B,g.disabled=M>=P}function b(v){let S=l.querySelector(`.lq-dp-doc-preview__page[data-page="${v}"]`);S&&S.scrollIntoView({block:`start`,behavior:`smooth`})}function _(){k&&k.disconnect();let v=new IntersectionObserver(S=>{let U=null;for(let j of S)j.isIntersecting&&(!U||j.intersectionRatio>U.intersectionRatio)&&(U=j);if(U){let j=parseInt(U.target.dataset.page||``,10);isNaN(j)||(V.value=String(j),H.disabled=j<=1,O.disabled=j>=He.length)}},{root:f,threshold:[.1,.3,.5]});k=v,l.querySelectorAll(`.lq-dp-doc-preview__page`).forEach(S=>v.observe(S))}function F(v){e.querySelector(`#cdp-preview-link .oc-link-icon-left`).innerHTML=`<i data-icon="doc-${v.type}"></i>`,e.getElementById(`cdp-preview-title`).textContent=v.name,e.getElementById(`cdp-preview-date`).textContent=v.date,e.getElementById(`cdp-preview-source`).textContent=v.source||``,R(n)}function D(){t++,k?.disconnect(),k=null,l.replaceChildren(),l.classList.remove(`lq-dp-doc-preview__pages--frame`),l.style.removeProperty(`zoom`)}function W(v){let S=document.createElement(`div`);S.className=`lq-dp-doc-preview__message`,X(S,v),l.classList.remove(`lq-dp-doc-preview__pages--frame`),l.replaceChildren(S),l.style.removeProperty(`zoom`)}function re(v){v?(d.href=v,d.removeAttribute(`aria-disabled`)):(d.removeAttribute(`href`),d.setAttribute(`aria-disabled`,`true`))}function Y(v){$.hidden=!v}async function de(v){D();let S=t;Y(!1),re(void 0),f.scrollTop=0,W(`preview.loading`);try{let U=await ft$1(v._id,{name:r.getAttribute(`query-name`)||St,text:``});if(S!==t)return;if(!U.documentCachedContentUrl){W(`preview.unavailable`);return}let j=document.createElement(`iframe`);j.className=`lq-dp-doc-preview__frame`,j.title=v.name,j.src=lr(U.documentCachedContentUrl).href,l.classList.add(`lq-dp-doc-preview__pages--frame`),l.replaceChildren(j),p(M),re(U.record?.url1||U.record?.originalUrl)}catch{S===t&&W(`preview.unavailable`)}}function ce(v,S,U){L&&L.classList.remove(`lq-doc-card--preview-active`,`lq-doc-row--preview-active`),L=S,C=U,S.classList.add(S.classList.contains(`lq-doc-row`)?`lq-doc-row--preview-active`:`lq-doc-card--preview-active`),F(v),de(v),n.classList.add(`lq-detail-panel--open`),i.classList.add(`lq-resize-handle--visible`)}function be(){n.classList.remove(`lq-detail-panel--open`,`lq-cdp--with-passages`),n.style.width=``,i.classList.remove(`lq-resize-handle--visible`),a.hidden=!0,a.classList.remove(`lq-passages-sidebar--collapsed`),s.innerHTML=``,T(),D(),Y(!0),L&&(L.classList.remove(`lq-doc-card--preview-active`,`lq-doc-row--preview-active`),L=null,C=-1)}function m(){if(!(C===-1||!n.classList.contains(`lq-detail-panel--open`)))if(r._cdvCurrentView===`grid`){let v=[...e.getElementById(`col-detail-grid`).querySelectorAll(`.lq-doc-card`)];v[C]&&(L=v[C],L.classList.add(`lq-doc-card--preview-active`))}else{let v=[...e.getElementById(`col-detail-list`).querySelectorAll(`.lq-doc-row`)];v[C]&&(L=v[C],L.classList.add(`lq-doc-row--preview-active`))}}g.addEventListener(`click`,()=>p(M+z)),q.addEventListener(`click`,()=>p(M-z)),H.addEventListener(`click`,()=>{b(Math.max(1,parseInt(V.value,10)-1))}),O.addEventListener(`click`,()=>{b(Math.min(He.length,parseInt(V.value,10)+1))}),V.addEventListener(`change`,()=>{let v=Math.max(1,Math.min(He.length,parseInt(V.value,10)||1));V.value=String(v),b(v)});function T(){l.querySelectorAll(`mark.lq-passage-highlight`).forEach(function(v){let S=document.createTextNode(v.textContent||``);v.replaceWith(S),S.parentNode&&S.parentNode.normalize()})}function J(v){T();let S=l.querySelector(`.lq-dp-doc-preview__page[data-page="${v.page}"]`);if(!S)return;let U=v.text.split(/\s+/).slice(0,5).join(` `),j=!1,le=document.createTreeWalker(S,NodeFilter.SHOW_TEXT,null),ye;for(;(ye=le.nextNode())&&!j;){let me=(ye.textContent||``).indexOf(U);if(me!==-1)try{let Re=document.createRange();Re.setStart(ye,me),Re.setEnd(ye,me+U.length);let Me=document.createElement(`mark`);Me.className=`lq-passage-highlight`,Re.surroundContents(Me),j=!0}catch{}}if(!j){let he=S.querySelector(`p, li`);if(he){let me=document.createElement(`mark`);me.className=`lq-passage-highlight`,me.innerHTML=he.innerHTML,he.innerHTML=``,he.appendChild(me)}}setTimeout(function(){let he=S.querySelector(`.lq-passage-highlight`);he&&he.scrollIntoView({block:`center`,behavior:`smooth`})},350)}function Q(v){s.innerHTML=``,v.forEach(function(S,U){let j=document.createElement(`button`);j.className=`oc-list-item oc-list-item-content oc-list-item-nav lq-passages-sidebar__item`,U===0&&j.classList.add(`oc-list-item-selected`);let le=document.createElement(`div`);le.className=`oc-list-item-text-block`;let ye=document.createElement(`span`);ye.className=`oc-list-item-text`,ye.textContent=S.text;let he=document.createElement(`span`);he.className=`oc-list-item-subtext`,X(he,`preview.pageNumber`,{page:S.page}),le.appendChild(ye),le.appendChild(he),j.appendChild(le),j.addEventListener(`click`,function(){s.querySelectorAll(`.lq-passages-sidebar__item`).forEach(function(me){me.classList.remove(`oc-list-item-selected`)}),j.classList.add(`oc-list-item-selected`),b(S.page),J(S)}),s.appendChild(j)})}function ne(v){e.querySelector(`#cdp-preview-link .oc-link-icon-left`).innerHTML=`<i data-icon="file-pdf"></i>`,e.getElementById(`cdp-preview-title`).textContent=v.title,e.getElementById(`cdp-preview-date`).textContent=v.date,e.getElementById(`cdp-preview-source`).textContent=v.path,R(n),D(),re(void 0),o(),p(.75),_(),Y(!0),f.scrollTop=0,V.value=`1`,H.disabled=!0,O.disabled=He.length<=1,Q(v.passages||[]),a.classList.remove(`lq-passages-sidebar--collapsed`),a.hidden=!1,R(a),n.classList.add(`lq-detail-panel--open`,`lq-cdp--with-passages`),i.classList.add(`lq-resize-handle--visible`),v.passages&&v.passages.length>0&&setTimeout(function(){b(v.passages[0].page),J(v.passages[0])},50)}h.addEventListener(`click`,function(){a.classList.add(`lq-passages-sidebar--collapsed`),R(a)}),x.addEventListener(`click`,function(){a.classList.remove(`lq-passages-sidebar--collapsed`),R(a)}),r._openRefDocPreview=ne,r._closeColDocPreview=be,r._syncColDocPreviewView=m,c.addEventListener(`click`,be),e.getElementById(`btn-cdp-ask-agent`).addEventListener(`click`,()=>{let v=e.querySelector(`#cdp-preview-link .oc-link-icon-left i`),S=e.getElementById(`cdp-preview-title`),U=v&&v.getAttribute(`data-icon`)||`file-search-reg`,j=S?(S.textContent||``).trim():``;r.dispatchEvent(new CustomEvent(`lexiq-collections:ask-followup`,{bubbles:!0,composed:!0,detail:{iconName:U,title:j,placeholder:y(`preview.askFollowUpPlaceholder`),suggestions:[y(`preview.suggestionSummarize`),y(`preview.suggestionKeyPoints`),y(`preview.suggestionActionItems`)]}}))});let ie=!1,ee=0,te=0;i.addEventListener(`mousedown`,v=>{ie=!0,ee=v.clientX,te=n.getBoundingClientRect().width,n.style.transition=`none`,document.body.style.cursor=`col-resize`,document.body.style.userSelect=`none`,v.preventDefault()}),document.addEventListener(`mousemove`,v=>{if(!ie)return;let U=r.getBoundingClientRect().width-32-12,j=ee-v.clientX,le=Math.min(Math.max(te+j,280),U-360);n.style.width=le+`px`}),document.addEventListener(`mouseup`,()=>{ie&&(ie=!1,n.style.transition=``,document.body.style.cursor=``,document.body.style.userSelect=``)}),e.getElementById(`col-detail-grid`).addEventListener(`click`,v=>{let S=v.target,U=S.closest(`.lq-doc-card`);if(!U||S.closest(`.lq-doc-card__btn-del`)||S.closest(`.lq-doc-card__checkbox`)||e.getElementById(`col-detail-grid`).classList.contains(`lq-cdv-grid--selecting`))return;let le=[...e.getElementById(`col-detail-grid`).querySelectorAll(`.lq-doc-card`)].indexOf(U);if(!(le===-1||!r._currentDocs[le])){if(L===U){be();return}ce(r._currentDocs[le],U,le)}}),e.getElementById(`col-detail-list`).addEventListener(`click`,v=>{let S=v.target,U=S.closest(`.lq-doc-row`);if(!U||S.closest(`.lq-doc-card__btn-del`)||S.closest(`.lq-doc-row__cb`)||e.getElementById(`col-detail-list`).classList.contains(`lq-cdv-list--selecting`))return;let le=[...e.getElementById(`col-detail-list`).querySelectorAll(`.lq-doc-row`)].indexOf(U);if(!(le===-1||!r._currentDocs[le])){if(L===U){be();return}ce(r._currentDocs[le],U,le)}})}function An(r){let e=r.shadowRoot,n=e.getElementById(`col-share-backdrop`),i=e.getElementById(`col-share-modal`),c=e.getElementById(`col-share-col-name`),l=e.getElementById(`col-share-access-list`),f=e.getElementById(`col-share-access-count`),g=e.getElementById(`col-share-member-portal`),q=e.getElementById(`btn-col-share-invite`),V=e.getElementById(`col-share-error`),I=null,H=[],O=null,$=null,d=!1,a=!1,s=ir({elements:{tagWrap:e.getElementById(`col-share-tag-wrap`),input:e.getElementById(`col-share-search-input`),dropdown:e.getElementById(`col-share-dropdown`),roleWrap:e.querySelector(`#col-share-tag-wrap .lq-col-share-perm-wrap`),roleBtn:e.getElementById(`col-share-perm-btn`),roleLabel:e.getElementById(`col-share-perm-label`),roleDropdown:e.getElementById(`col-share-perm-dropdown`)},placeholderKey:`share.searchPlaceholder`,ariaLabelKey:`share.searchUsers`,excludeIds:()=>H.map(t=>t.id),onChange:()=>{q.disabled=!s.getEntries().length}});function h(t,o){let{name:p,email:b,isGroup:_,resolved:F,isSelf:D}=Hn(t);return{id:t,name:p,email:b,isGroup:_,role:o,resolved:F,isSelf:D}}function x(t){let o=new Set,p=[],b=(_,F)=>{o.has(_)||(o.add(_),p.push(h(_,F)))};return b(t.creatorId,`creator`),t.ownerIds.forEach(_=>b(_,`owner`)),t.readerIds.forEach(_=>b(_,`reader`)),p.sort((_,F)=>{let D=+(F.role===`creator`)-+(_.role===`creator`);return D!==0?D:_.name.localeCompare(F.name)})}function z(){if(g.hidden=!0,$){let t=l.querySelector(`[data-member-id="${$}"].lq-col-share-member-perm-btn`);t&&t.setAttribute(`aria-expanded`,`false`),$=null}}function B(){se(f,`share.accessCount`,H.length),l.classList.toggle(`lq-col-share-access-list--busy`,a),l.innerHTML=H.map(t=>{if(t.id===O)return`<div class="lq-col-share-confirm-row">
          <span class="lq-col-share-confirm-text" data-i18n="share.confirmRemove" data-i18n-params="${Se({name:t.name})}">${K(y(`share.confirmRemove`,{name:t.name}))}</span>
          <div class="lq-col-share-confirm-actions">
            <button class="lq-btn lq-btn--sm lq-btn--tertiary-neutral" data-action="cancel-remove" data-member-id="${t.id}" data-i18n="common.cancel">${K(y(`common.cancel`))}</button>
            <button class="lq-btn lq-btn--sm lq-btn--secondary-danger" data-action="confirm-remove" data-member-id="${t.id}" data-i18n="common.remove">${K(y(`common.remove`))}</button>
          </div>
        </div>`;let o=t.resolved?`lq-col-share-member-name`:`lq-col-share-member-name lq-col-share-member-name--pending`,p=t.isSelf?` <span class="lq-col-share-member-you" data-i18n="share.you">${K(y(`share.you`))}</span>`:``,b=(t.resolved?K(t.name):`<span data-i18n-attr="title:share.unresolvedName" title="${K(y(`share.unresolvedName`))}">${K(t.name)}</span>`)+p,_=t.role===`creator`?`share.owner`:Ie[t.role],F=t.role===`creator`||t.role===`owner`?`crown`:`eye`,D=t.role===`creator`||t.isSelf?`<span class="lq-col-share-member-perm-label"><i data-icon="${F}"></i> <span data-i18n="${_}">${K(y(_))}</span></span>`:`<div class="lq-col-share-member-perm-wrap">
            <button type="button" class="lq-btn lq-btn--sm lq-btn--tertiary-neutral lq-col-share-member-perm-btn" data-member-id="${t.id}" aria-expanded="false" aria-haspopup="listbox">
              <i data-icon="${F}"></i> <span data-i18n="${Ie[t.role]}">${K(y(Ie[t.role]))}</span> <i data-icon="chevron-down"></i>
            </button>
          </div>`;return`<div class="lq-col-share-member-row">
        ${Sr(t.name,t.isGroup)}
        <div class="lq-col-share-member-info">
          <span class="${o}">${b}</span>
          ${t.email?`<span class="lq-col-share-member-email">${K(t.email)}</span>`:``}
        </div>
        ${D}
      </div>`}).join(``),R(l)}function P(t,o){let p=[],b=[];return H.forEach(_=>{if(_.role===`creator`)return;let F=_.id===t?o:_.role;F===`owner`?p.push(_.id):F===`reader`&&b.push(_.id)}),{owners:p,readers:b}}async function M(t,o){if(!I||a)return;a=!0,oe(V),B();let{owners:p,readers:b}=P(t,o);try{let _=await Z.update(I.id,{owners:p,readers:b});if(!_)return;I=_,r._currentCol=_,H=x(_),O=null}catch(_){ue(V,ge(_))}finally{a=!1,B()}}function L(t){I=t,H=x(t),O=null,$=null,a=!1,g.hidden=!0,s.reset(),q.disabled=!0,B(),ar().then(()=>{I===t&&B()}),In(H.map(o=>o.id)).then(()=>{I===t&&(H=x(t),B())}),oe(V),c.textContent=t.name,xe(e,`col-share-backdrop`,`col-share-modal`,k),setTimeout(()=>s.focus(),200)}function C(){we(e,`col-share-backdrop`,`col-share-modal`)}function k(){if(!g.hidden){z();return}if(s.hasOpenDropdown()){s.closeDropdowns();return}C()}e.getElementById(`btn-col-share-close`).addEventListener(`click`,C),q.addEventListener(`click`,async()=>{let t=s.getEntries();if(!t.length||!I||d)return;d=!0,oe(V),ae(q,!0,y(`share.adding`));let o=[...I.ownerIds,...t.filter(b=>b.role===`owner`).map(b=>b.id)],p=[...I.readerIds,...t.filter(b=>b.role===`reader`).map(b=>b.id)];try{let b=await Z.update(I.id,{owners:o,readers:p});if(!b)return;I=b,r._currentCol=b,H=x(b),s.reset(),q.disabled=!0,B()}catch(b){ue(V,ge(b))}finally{d=!1,ae(q,!1)}}),n.addEventListener(`click`,C),document.addEventListener(`click`,t=>{if(i.hidden)return;let o=t.composedPath(),p=e.getElementById(`col-share-tag-wrap`).closest(`.lq-col-share-search-wrap`);(!p||!o.includes(p))&&s.closeDropdowns();let b=o.some(_=>_ instanceof Element&&_.classList.contains(`lq-col-share-member-perm-btn`));!g.hidden&&!o.includes(g)&&!b&&z()}),g.addEventListener(`mousedown`,t=>{let o=t.target.closest(`[data-action]`);if(!o)return;t.preventDefault();let p=o.dataset.action,b=o.dataset.memberId;o.classList.add(`oc-list-item-pressed`),setTimeout(()=>{o.classList.remove(`oc-list-item-pressed`),z(),p===`role`?M(b,o.dataset.role):p===`remove`&&(O=b,B())},150)}),l.addEventListener(`mousedown`,t=>{if(a)return;let o=t.target.closest(`.lq-col-share-member-perm-btn`);if(o){t.preventDefault();let F=o.dataset.memberId,D=$===F&&!g.hidden;if(z(),s.closeDropdowns(),!D){g.innerHTML=`
          <button class="oc-list-item oc-list-item-menu oc-list-item-md" data-action="role" data-role="owner" data-member-id="${F}" role="option" type="button">
            <div class="oc-list-item-left"><i data-icon="crown"></i><div class="oc-list-item-text-block"><span class="oc-list-item-text" data-i18n="share.owner">${K(y(`share.owner`))}</span></div></div>
          </button>
          <button class="oc-list-item oc-list-item-menu oc-list-item-md" data-action="role" data-role="reader" data-member-id="${F}" role="option" type="button">
            <div class="oc-list-item-left"><i data-icon="eye"></i><div class="oc-list-item-text-block"><span class="oc-list-item-text" data-i18n="share.reader">${K(y(`share.reader`))}</span></div></div>
          </button>
          <hr style="border:none;border-top:1px solid var(--stroke-neutral-base);margin:var(--space-3xs) 0">
          <button class="oc-list-item oc-list-item-menu oc-list-item-md lq-list-item--danger" data-action="remove" data-member-id="${F}" role="option" type="button">
            <div class="oc-list-item-left"><div class="oc-list-item-text-block"><span class="oc-list-item-text" data-i18n="common.remove">${K(y(`common.remove`))}</span></div></div>
          </button>`;let W=o.getBoundingClientRect(),re=i.getBoundingClientRect();g.style.top=W.bottom-re.top+4+`px`,g.style.right=re.right-W.right+`px`,g.hidden=!1,$=F,o.setAttribute(`aria-expanded`,`true`),R(g)}return}let p=t.target.closest(`[data-action]`);if(!p)return;t.preventDefault();let b=p.dataset.action,_=p.dataset.memberId;b===`confirm-remove`?M(_,`remove`):b===`cancel-remove`&&(O=null,B())}),e.getElementById(`col-detail-share`).addEventListener(`click`,()=>{r._currentCol&&L(r._currentCol)})}function Pn(r){return r.uploadStatus===`upload_interrupted`?!0:r.indexingStatus===`complete`||r.indexingStatus===`failed`||r.indexingStatus===`interrupted`}function Rn(r){return(r.containers??[]).flatMap(e=>e.jobs??[])}var sr=class{_intervalMs;_maxIntervalMs;_tick;_timer=null;_abort=null;_running=!1;_idleSteps=0;constructor(e){this._intervalMs=e.intervalMs??1500,this._maxIntervalMs=e.maxIntervalMs??3e4,this._tick=e.tick}get running(){return this._running}start(){this._running||(this._running=!0,this._idleSteps=0,this._schedule(0))}stop(){this._running=!1,this._timer&&(clearTimeout(this._timer),this._timer=null),this._abort?.abort(),this._abort=null}_schedule(e){this._running&&(this._timer=setTimeout(()=>{this._timer=null,this._run()},e))}_backoffDelay(){return Math.min(this._intervalMs*2**this._idleSteps,this._maxIntervalMs)}async _run(){if(!this._running)return;let e=new AbortController;this._abort=e;try{let n=await this._tick(e.signal);if(!this._running)return;if(!n.pending){this.stop();return}n.changed?this._idleSteps=0:this._idleSteps++,this._schedule(n.changed?this._intervalMs:this._backoffDelay())}catch{if(e.signal.aborted||!this._running)return;this._idleSteps++,this._schedule(this._backoffDelay())}finally{this._abort===e&&(this._abort=null)}}};var Ir=null;function $n(){return Ir??=Ma().catch(()=>!1).finally(()=>{Ir=null}),Ir}var It=100;var cr=[0,1e3,3e3,5e3,1e4,15e3,2e4,3e4,3e4,3e4,3e4,3e4,3e4,3e4,3e4];var Ht=new Set([400,403,404,409,410,413,422,507]);function Fn(r$2){let e=r$2.shadowRoot;r$2._uploadTracker=(function(){let n=e.getElementById(`lq-upload-tracker`),i=e.getElementById(`ut-col-name`),c=e.getElementById(`ut-file-count`),l=e.getElementById(`ut-inline-body`),f=e.getElementById(`ut-detail-body`),g=e.getElementById(`ut-collapse-btn`),q=e.getElementById(`ut-dismiss-btn`),V=e.getElementById(`ut-lbl-upload`),I=e.getElementById(`ut-lbl-index`),H=e.getElementById(`ut-lbl-done`),O=e.getElementById(`ut-lbl-error`),$=e.getElementById(`ut-inline-sep`),d=e.getElementById(`ut-inline-sep-2`),a=e.getElementById(`ut-inline-sep-3`),s$1=e.getElementById(`ut-inline-upload-stat`),h=e.getElementById(`ut-inline-index-stat`),x=e.getElementById(`ut-inline-done-stat`),z=e.getElementById(`ut-inline-error-stat`),B=e.getElementById(`ut-peek-text`),P=e.getElementById(`ut-conn`),M=e.getElementById(`ut-conn-title`),L=e.getElementById(`ut-conn-detail`),C=e.getElementById(`ut-conn-countdown`),k=e.getElementById(`ut-conn-retry`),t=new Map,o=0,p=0,b=0,_=!1,F=new Map,D=new Map,W=null,re=null,Y=null,de=null,ce=null,be=!1,m=null,T=null;function J(u){return u===`pdf`?`col-doc-pdf`:u===`csv`?`col-doc-csv`:`col-doc-doc`}function Q(u){return u.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`)}function ne(u){return u.status===`done`||u.status===`error`||u.status===`rejected`}function ie(u){return u.status===`error`||u.status===`rejected`}function ee(u,w=null){return[...D.values()].filter(E=>E.status===u&&(w===null||E.colId===w))}function te(u,w=null){let E=ee(u,w);return E.length?E.reduce((G,A)=>G+A.pct,0)/E.length:0}function v(u,w){let E=`${u}:${w}`;return F.has(E)?F.get(E):!0}function S(){let u=t.size;u===1?i.textContent=[...t.values()][0]:se(i,`tracker.collectionCount`,u),se(c,`tracker.fileCount`,b)}function U(){ke(),_&&nt()}function j(u,w){if(u.length<=w)return u;let E=u.lastIndexOf(`.`);if(E>0&&u.length-E<=5){let G=u.slice(E);return u.slice(0,w-G.length-1)+`…`+G}return u.slice(0,w-1)+`…`}function le(u,w){return u.length===1?j(u[0].name,26):pe(w,u.length)}function ye(){let u=ee(`uploading`),w=ee(`indexing`),E=ee(`done`),G=[...D.values()].filter(ie);if(G.length>0)return G.length===1?j(G[0].name,22):pe(`tracker.errorCount`,G.length);if(E.length>0&&u.length===0&&w.length===0)return E.length===1?j(E[0].name,22):pe(`tracker.indexedCount`,E.length);return pe(`tracker.fileCount`,u.length+w.length)}function he(u,w,E){be=!0,B.classList.add(`lq-upload-tracker__peek-text--hidden`),setTimeout(()=>{B.textContent=u,B.className=`lq-upload-tracker__peek-text`,w&&B.classList.add(w),B.classList.add(`lq-upload-tracker__peek-text--from-below`),B.offsetWidth,B.classList.remove(`lq-upload-tracker__peek-text--from-below`),setTimeout(E||(()=>{be=!1}),150)},150)}function me(u,w){if(!n.classList.contains(`lq-upload-tracker--minimized`))return;de&&(clearTimeout(de),de=null);let E=w===`lq-upload-tracker__peek-text--success`;n.classList.toggle(`lq-upload-tracker--peek-success`,E),n.classList.toggle(`lq-upload-tracker--peek-error`,!E),he(u,w,()=>{de=setTimeout(()=>{de=null,n.classList.remove(`lq-upload-tracker--peek-success`,`lq-upload-tracker--peek-error`),he(ye(),null)},3500)})}function Re(u){if(_||n.classList.contains(`lq-upload-tracker--minimized`))return;Y&&(clearTimeout(Y),Y=null);let w=c.textContent;l.hidden=!0,c.textContent=u?j(u.name,30):y(`tracker.fileIndexed`),c.classList.add(`lq-upload-tracker__count--flash`),Y=setTimeout(()=>{Y=null,c.textContent=w,c.classList.remove(`lq-upload-tracker__count--flash`),_||(l.hidden=!1,ke())},3e3)}function Me(u){let w=Math.max(0,Math.round(u/1e3));return`${Math.floor(w/60)}:${String(w%60).padStart(2,`0`)}`}function Rr(){if(!m)return;let u=Date.now(),w=[];if(m.phase===`retrying`&&m.retryAtMs!==void 0){let E=m.retryAtMs-u;w.push(E>0?y(`tracker.nextTryIn`,{time:Me(E)}):y(`tracker.tryingNow`))}w.push(y(`tracker.lostAgo`,{time:Me(u-m.sinceMs)})),m.phase===`retrying`&&m.budgetEndsAtMs!==void 0&&w.push(y(`tracker.givesUpIn`,{time:Me(m.budgetEndsAtMs-u)})),C.textContent=w.join(` · `)}function $r(){if(T&&(clearInterval(T),T=null),!m||n.hidden){P.hidden=!0,n.classList.remove(`lq-upload-tracker--offline`);return}let u=pe(`tracker.uploadCount`,m.uploads);if(m.phase===`reconnecting`)X(M,`tracker.reconnecting`),X(L,`tracker.restoringSession`);else if(m.phase===`signed-out`)X(M,`tracker.signedOut`),m.uploads?X(L,`tracker.uploadsPaused`,{files:u}):X(L,`tracker.signInAgain`);else{X(M,`tracker.connectionLost`);let w={attempt:m.attempt,max:m.maxAttempts};m.uploads?X(L,`tracker.retryAttemptWithFiles`,s(r({},w),{files:u})):X(L,`tracker.retryAttempt`,w)}k.hidden=m.phase!==`signed-out`||!m.retry,P.hidden=!1,n.classList.add(`lq-upload-tracker--offline`),R(P),Rr(),T=setInterval(Rr,1e3)}k.addEventListener(`click`,u=>{u.stopPropagation(),m?.retry?.()});function ke(){let u=ee(`uploading`),w=ee(`indexing`),E=ee(`done`),G=[...D.values()].filter(ie);se(V,`tracker.uploadingCount`,u.length),se(I,`tracker.indexingCount`,w.length),H.textContent=le(E,`tracker.completedCount`),O.textContent=le(G,`tracker.failedCount`);let A=t.size>1;s$1.hidden=u.length===0,h.hidden=w.length===0,x.hidden=E.length===0||A,z.hidden=G.length===0,$.hidden=u.length===0||w.length===0,d.hidden=A||u.length===0&&w.length===0||E.length===0,a.hidden=A?u.length===0&&w.length===0||G.length===0:E.length===0||G.length===0;let N=G.length>0;n.classList.toggle(`lq-upload-tracker--has-errors`,N),be||(B.textContent=ye())}function nt(){for(let u of t.keys())[`uploading`,`indexing`].forEach(w=>{let E=f.querySelector(`.lq-ut-section[data-sec="${w}"][data-col="${u}"]`);if(!E)return;let G=E.querySelector(`.lq-ut-section__bar-fill`);G&&(G.style.width=te(w,u).toFixed(1)+`%`);let A=ee(w,u);E.querySelectorAll(`.lq-ut-doc-row`).forEach((N,ve)=>{let Ve=N.querySelector(`.lq-ut-doc-row__pct`);Ve&&A[ve]&&(Ve.textContent=Math.round(A[ve].pct)+`%`)})})}function $e(u,w){let E=ee(u,w);if(!E.length)return``;let A={uploading:{icon:`ut-upload`,titleKey:`tracker.sectionUploading`,bar:!0,dots:!0,toggle:!0,variant:``},indexing:{icon:`ut-sync`,titleKey:`tracker.sectionIndexing`,bar:!0,dots:!0,toggle:!0,variant:``},done:{icon:`ut-check`,titleKey:`tracker.sectionCompleted`,bar:!1,dots:!1,toggle:!1,variant:`done`},error:{icon:`ut-error`,titleKey:`tracker.sectionFailed`,bar:!1,dots:!1,toggle:!1,variant:`error`},rejected:{icon:`ut-error`,titleKey:`tracker.sectionNotIndexed`,bar:!1,dots:!1,toggle:!1,variant:``}}[u],N=te(u,w),ve=v(w,u),Ve=E.map(Be=>{let dt=u===`done`?`<span class="lq-ut-doc-row__done-label" data-i18n="tracker.complete">${Q(y(`tracker.complete`))}</span>
             <button class="lq-btn lq-btn--tertiary-neutral lq-btn--sm lq-btn--icon lq-ut-doc-row__remove" data-id="${Be.id}" data-i18n-attr="aria-label:tracker.dismiss" aria-label="${Q(y(`tracker.dismiss`))}"><i data-icon="panel-close"></i></button>`:u===`error`?`<span class="lq-ut-doc-row__status lq-ut-doc-row__status--error"><i data-icon="ut-error"></i></span>`:u===`rejected`?``:`<span class="lq-ut-doc-row__pct">${Math.round(Be.pct)}%</span>`,pt=Be.msg?`<span class="lq-ut-doc-row__msg" title="${Q(Be.msg)}">${Q(Be.msg)}</span>`:``;return`
          <div class="lq-ut-doc-row${u===`done`?` lq-ut-doc-row--done`:u===`error`?` lq-ut-doc-row--error`:``}">
            <span class="lq-ut-doc-row__icon"><i data-icon="${J(Be.type)}"></i></span>
            <span class="lq-ut-doc-row__name">${Be.name}</span>
            ${pt}
            ${dt}
          </div>`}).join(``),pr=A.bar?`<div class="lq-ut-section__bar"><div class="lq-ut-section__bar-fill" style="width:${N.toFixed(1)}%"></div></div>`:``,st=A.dots?`<span class="lq-doc-status__dots"><span></span><span></span><span></span></span>`:``,ct=A.toggle?`<button class="lq-btn lq-btn--tertiary-neutral lq-btn--sm lq-btn--icon lq-ut-section__toggle" data-sec="${u}" data-col="${w}" data-i18n-attr="aria-label:tracker.toggleSection" aria-label="${Q(y(`tracker.toggleSection`))}"><i data-icon="chevron-down"></i></button>`:``;return`
        <div class="lq-ut-section${A.variant?` lq-ut-section--`+A.variant:``}" data-sec="${u}" data-col="${w}">
          <div class="lq-ut-section__row">
            <span class="lq-ut-section__icon"><i data-icon="${A.icon}"></i></span>
            <span class="lq-ut-section__title"><span data-i18n="${A.titleKey}">${Q(y(A.titleKey))}</span>${st}</span>
            ${pr}
            <span class="oc-tab__badge lq-ut-section__badge">${E.length}</span>
            ${ct}
          </div>
          <div class="lq-ut-section__docs${ve?` lq-ut-section__docs--open`:``}" data-sec="${u}" data-col="${w}">${Ve}</div>
        </div>`}function _e(){let u=[...t.keys()],w=u.length>1;o=Math.min(o,u.length-1);let E=u[o],G=$e(`uploading`,E)+$e(`indexing`,E)+$e(`done`,E)+$e(`error`,E)+$e(`rejected`,E);if(w){let A=o===0,N=o===u.length-1;f.innerHTML=`
          <div class="lq-ut-col-nav">
            <button class="lq-btn lq-btn--tertiary-neutral lq-btn--sm lq-btn--icon" id="ut-col-prev" data-i18n-attr="aria-label:tracker.previousCollection" aria-label="${Q(y(`tracker.previousCollection`))}"${A?` disabled`:``}><i data-icon="chevron-left"></i></button>
            <span class="lq-ut-col-nav__label">${t.get(E)}<span class="lq-ut-col-nav__page">${o+1}/${u.length}</span></span>
            <button class="lq-btn lq-btn--tertiary-neutral lq-btn--sm lq-btn--icon" id="ut-col-next" data-i18n-attr="aria-label:tracker.nextCollection" aria-label="${Q(y(`tracker.nextCollection`))}"${N?` disabled`:``}><i data-icon="chevron-right"></i></button>
          </div>
          ${G}`}else f.innerHTML=G;R(f),f.querySelector(`#ut-col-prev`)?.addEventListener(`click`,A=>{A.stopPropagation(),o>0&&(o--,_e())}),f.querySelector(`#ut-col-next`)?.addEventListener(`click`,A=>{A.stopPropagation(),o<t.size-1&&(o++,_e())}),requestAnimationFrame(()=>{f.querySelectorAll(`.lq-ut-section__docs`).forEach(A=>{let N=A;v(N.dataset.col,N.dataset.sec)&&N.classList.add(`lq-ut-section__docs--open`)}),f.querySelectorAll(`.lq-ut-section__toggle`).forEach(A=>{let N=A;v(N.dataset.col,N.dataset.sec)&&N.classList.add(`lq-ut-section__toggle--open`)})}),f.querySelectorAll(`.lq-ut-section__toggle`).forEach(A=>{let N=A;N.addEventListener(`click`,()=>tt(N.dataset.sec,N.dataset.col)),N.addEventListener(`mouseenter`,()=>{let ve=v(N.dataset.col,N.dataset.sec);r$2._tooltip.el.textContent=y(ve?`common.collapse`:`common.expand`),r$2._tooltip.el.className=`oc-tooltip oc-tooltip-placement-top`,r$2._tooltip.el.style.display=``,r$2._tooltip.position(N,`top`)}),N.addEventListener(`mouseleave`,()=>{r$2._tooltip.el.style.display=`none`}),N.addEventListener(`mousedown`,()=>{r$2._tooltip.el.style.display=`none`})}),f.querySelectorAll(`.lq-ut-doc-row__remove`).forEach(A=>{let N=A;N.addEventListener(`click`,ve=>{ve.stopPropagation(),D.delete(N.dataset.id),ke(),_e()}),r$2._tooltip.attach(N,`common.remove`,`top`)})}function tt(u,w){let E=f.querySelector(`.lq-ut-section__docs[data-sec="${u}"][data-col="${w}"]`),G=f.querySelector(`.lq-ut-section__toggle[data-sec="${u}"][data-col="${w}"]`);if(!E)return;let A=!E.classList.contains(`lq-ut-section__docs--open`);E.classList.toggle(`lq-ut-section__docs--open`,A),G&&G.classList.toggle(`lq-ut-section__toggle--open`,A),F.set(`${w}:${u}`,A)}function Xe(u){_=u,n.classList.toggle(`lq-upload-tracker--expanded`,u),l.hidden=u,f.hidden=!u,u&&_e()}function Fr(){dr(),Y&&(clearTimeout(Y),Y=null),de&&(clearTimeout(de),de=null),ce&&(clearTimeout(ce),ce=null),T&&(clearInterval(T),T=null),be=!1,m=null,P.hidden=!0,n.classList.remove(`lq-upload-tracker--offline`),n.classList.remove(`lq-upload-tracker--col-complete`),B.className=`lq-upload-tracker__peek-text`,c.classList.remove(`lq-upload-tracker__count--flash`),D.clear(),t.clear(),o=0,p=0,F.clear(),b=0,_=!1,n.hidden=!0,n.classList.remove(`lq-upload-tracker--expanded`),n.classList.remove(`lq-upload-tracker--minimized`),n.classList.remove(`lq-upload-tracker--all-done`),n.classList.remove(`lq-upload-tracker--dismissing`),n.classList.remove(`lq-upload-tracker--peek-success`,`lq-upload-tracker--peek-error`),l.hidden=!1,f.hidden=!0,f.innerHTML=``}function dr(){re&&(clearTimeout(re),re=null),n.classList.remove(`lq-upload-tracker--minimized-hover`)}function ot(){_&&Xe(!1),dr(),B.textContent=c.textContent,n.style.transition=`transform 0.18s ease-in`,n.classList.add(`lq-upload-tracker--minimized`),n.addEventListener(`transitionend`,()=>{n.style.transition=``},{once:!0})}function Je(){dr(),n.classList.remove(`lq-upload-tracker--minimized`)}function at(){Y&&(clearTimeout(Y),Y=null),de&&(clearTimeout(de),de=null),be=!1,B.className=`lq-upload-tracker__peek-text`,c.classList.remove(`lq-upload-tracker__count--flash`),_=!1,n.classList.remove(`lq-upload-tracker--expanded`),l.hidden=!0,f.hidden=!0,n.classList.contains(`lq-upload-tracker--minimized`)&&Je(),n.classList.add(`lq-upload-tracker--all-done`);let u=p+[...D.values()].filter(w=>w.status===`done`).length;se(c,`tracker.indexedFileCount`,u),B.textContent=u===1?j([...D.values()].find(w=>w.status===`done`).name,22):pe(`tracker.indexedCount`,u),it()}function it(){W||(W=setTimeout(()=>{W=null,n.classList.add(`lq-upload-tracker--dismissing`),setTimeout(Fr,320)},3e3))}g.addEventListener(`click`,u=>{u.stopPropagation(),n.classList.contains(`lq-upload-tracker--minimized`)?Je():Xe(!_)}),q.addEventListener(`click`,u=>{u.stopPropagation(),W&&(clearTimeout(W),W=null),n.classList.contains(`lq-upload-tracker--minimized`)||n.classList.contains(`lq-upload-tracker--all-done`)?Fr():ot()}),n.addEventListener(`mouseenter`,()=>{n.classList.contains(`lq-upload-tracker--minimized`)&&(re&&(clearTimeout(re),re=null),n.classList.add(`lq-upload-tracker--minimized-hover`))}),n.addEventListener(`mouseleave`,()=>{n.classList.contains(`lq-upload-tracker--minimized`)&&(re=setTimeout(()=>{n.classList.remove(`lq-upload-tracker--minimized-hover`),re=null},250))}),n.addEventListener(`click`,()=>{n.classList.contains(`lq-upload-tracker--minimized`)&&Je()});function lt(u){let w=t.get(u)||``,E=[...D.entries()].filter(([,A])=>A.colId===u),G=()=>{ce=null,E.forEach(([A])=>D.delete(A)),p+=E.length,b=Math.max(0,b-E.length),t.delete(u),o=Math.min(o,Math.max(0,t.size-1)),n.classList.remove(`lq-upload-tracker--col-complete`),S(),ke(),_&&_e()};if(n.classList.contains(`lq-upload-tracker--minimized`)){me(`${j(w,18)}: indexed`,`lq-upload-tracker__peek-text--success`),G();return}Y&&(clearTimeout(Y),Y=null,c.classList.remove(`lq-upload-tracker__count--flash`)),ce&&(clearTimeout(ce),ce=null,n.classList.remove(`lq-upload-tracker--col-complete`)),_&&Xe(!1),n.classList.add(`lq-upload-tracker--col-complete`),i.textContent=j(w,28),X(c,`tracker.complete`),ce=setTimeout(G,3500)}return g.addEventListener(`mouseenter`,()=>{r$2._tooltip.el.textContent=y(_?`common.collapse`:`common.expand`),r$2._tooltip.el.className=`oc-tooltip oc-tooltip-placement-top`,r$2._tooltip.el.style.display=``,r$2._tooltip.position(g,`top`)}),g.addEventListener(`mouseleave`,()=>{r$2._tooltip.el.style.display=`none`}),g.addEventListener(`mousedown`,()=>{r$2._tooltip.el.style.display=`none`}),q.addEventListener(`mouseenter`,()=>{r$2._tooltip.el.textContent=y(n.classList.contains(`lq-upload-tracker--minimized`)||n.classList.contains(`lq-upload-tracker--all-done`)?`common.close`:`common.minimize`),r$2._tooltip.el.className=`oc-tooltip oc-tooltip-placement-top`,r$2._tooltip.el.style.display=``,r$2._tooltip.position(q,`top`)}),q.addEventListener(`mouseleave`,()=>{r$2._tooltip.el.style.display=`none`}),q.addEventListener(`mousedown`,()=>{r$2._tooltip.el.style.display=`none`}),{addFiles(u,w,E){W&&(clearTimeout(W),W=null),n.classList.contains(`lq-upload-tracker--minimized`)&&Je(),t.set(w,E),o=t.size-1,u.forEach(G=>{D.set(G.id,{id:G.id,name:G.name,type:G.type,colId:w,status:`uploading`,pct:0}),b++}),S(),n.hidden=!1,_&&Xe(!1),R(n),ke(),$r()},onProgress(u,w){let E=D.get(u);E&&(E.pct=w),U()},onIndexing(u){let w=D.get(u);w&&(w.status=`indexing`,w.pct=0),ke(),_&&_e()},onComplete(u){let w=D.get(u);w&&(w.status=`done`,w.pct=100),ke();let E=[...D.values()],G=E.every(ne),A=E.some(ie);if(G&&!A)Y&&(clearTimeout(Y),Y=null,l.hidden=!1,c.classList.remove(`lq-upload-tracker__count--flash`)),at();else if(w&&t.size>1){let N=E.filter(pr=>pr.colId===w.colId),ve=N.every(ne),Ve=N.some(ie);ve&&!Ve?lt(w.colId):_&&_e()}else _?_e():n.classList.contains(`lq-upload-tracker--minimized`)?me(w?j(w.name,22):y(`tracker.fileIndexed`),`lq-upload-tracker__peek-text--success`):Re(w)},onJobUpdate(u){let w=!1;return u.forEach(E=>{(E.errors??[]).forEach(A=>{let N=D.get(`${E.jobId}/${A.fileName}`),ve=A.error??void 0;N&&(N.status!==`error`||N.msg!==ve)&&(N.status=`error`,N.pct=0,N.msg=ve,w=!0)}),(E.rejected??[]).forEach(A=>{let N=D.get(`${E.jobId}/${A.fileName}`);N&&(N.status!==`rejected`||N.msg!==A.reason)&&(N.status=`rejected`,N.pct=0,N.msg=A.reason,w=!0)});let G=E.indexingProgress?.percentage;E.indexingStatus===`indexing`&&typeof G==`number`&&D.forEach((A,N)=>{A.status===`indexing`&&N.startsWith(`${E.jobId}/`)&&A.pct!==G&&(A.pct=G,w=!0)})}),w?(ke(),_&&_e(),!0):!1},onConnectionChange(u){let w=m?.phase??null;m=u,$r(),u&&u.phase!==w&&n.classList.contains(`lq-upload-tracker--minimized`)&&me(y(u.phase===`signed-out`?`tracker.signedOut`:`tracker.connectionLost`),`lq-upload-tracker__peek-text--error`)},onError(u){let w=D.get(u);w&&(w.status=`error`,w.pct=0),ke(),t.size===1&&n.classList.contains(`lq-upload-tracker--minimized`)?me(w?j(w.name,22):y(`tracker.uploadFailed`),`lq-upload-tracker__peek-text--error`):_&&_e()}}})(),(function(){let n=e.getElementById(`col-upload-backdrop`),i=e.getElementById(`col-upload-dropzone`),c=e.getElementById(`col-upload-input`),l=e.getElementById(`col-upload-file-list`),f=e.getElementById(`btn-col-upload-cancel`),g=e.getElementById(`btn-col-upload-confirm`),q=[];function V(m,T){e.querySelectorAll(`[data-doc-id="${m._id}"] .lq-doc-status`).forEach(J=>{let Q=J.classList.contains(`lq-doc-status--row`),ne=document.createElement(`span`);ne.className=Q?`lq-doc-row__date`:`lq-doc-card__date`,X(ne,T),J.replaceWith(ne)})}function I(m){m.status=`indexing`,e.querySelectorAll(`[data-doc-id="${m._id}"] .lq-doc-status__label`).forEach(T=>X(T,`tracker.stageIndexing`)),r$2._uploadTracker?.onIndexing(m._id)}function H(m){m.status=null,m.date=y(`format.uploadedJustNow`),V(m,`format.uploadedJustNow`),r$2._uploadTracker?.onComplete(m._id)}function O(m){m.status=`error`,V(m,`tracker.uploadFailed`),r$2._uploadTracker?.onError(m._id)}let $=new Set,d=new Map;function a(m,T){let J=Z.getDocuments(m),Q=!1,ne=!1;return T.forEach(ie=>{let ee=ie,te=Cr(ee.status);(te===`uploading`||te===`indexing`)&&(Q=!0);let v=J.find(S=>S._id===ee.id);if(v){if($.has(v._id)&&v.status===`uploading`){te===`error`&&($.delete(v._id),O(v),ne=!0);return}te===`indexing`&&v.status!==`indexing`?(I(v),ne=!0):te===null&&v.status!==null?($.delete(v._id),H(v),ne=!0):te===`error`&&v.status!==`error`?($.delete(v._id),O(v),ne=!0):te===`uploading`&&typeof ee.percent==`number`&&v.percent!==ee.percent&&(v.percent=ee.percent,r$2._uploadTracker?.onProgress(v._id,ee.percent),ne=!0)}}),{pending:Q,changed:ne}}async function s$2(m){try{let T=await h(m);return _(),T}catch(T){if(T instanceof z&&T.status===401)return{pending:await F(),changed:!1};throw T}}async function h(m){let T=r$2._currentCol?.id,Q=Rn(await Ht$1(T?{containerId:T}:{},{signal:m})),ne=r$2._uploadTracker?.onJobUpdate?.(Q)===!0,ie=Q.some(ee=>!Pn(ee));if(T){let te=a(T,(await zt$1(T,{page:1,pageSize:It},{signal:m})).documents);ie=ie||te.pending,ne=ne||te.changed}return{pending:ie||$.size>0,changed:ne}}let x=new sr({tick:s$2});r$2._startUploadPolling=()=>x.start(),r$2._stopUploadPolling=()=>x.stop();function z$1(m,T,J,Q,ne,ie){let ee=r$2.getAttribute(`upload-endpoint`);if(!ee){O(m);return}let te=new wo(T,{endpoint:lr(ee).href,chunkSize:5242880,uploadSize:T.size,retryDelays:cr,removeFingerprintOnSuccess:!0,onShouldRetry(v,S){let U=v.originalResponse?v.originalResponse.getStatus():0;if(U===401){if(F(),L)return b(m._id),!1}else if(Ht.has(U))return b(m._id),!1;return p(m._id,S),!0},onAfterResponse(v,S){S.getStatus()<400&&_(m._id)},metadata:{containerId:J,jobId:Q,fileName:T.name,totalBytes:String(ie),fileCount:String(ne)},async onBeforeRequest(v){k&&await k,ba().forEach((S,U)=>v.setHeader(U,S))},onProgress(v,S){m.status===`uploading`&&r$2._uploadTracker?.onProgress(m._id,S?v/S*100:0)},onSuccess(){_(m._id),d.delete(m._id),I(m),x.start()},onError(){b(m._id),$.delete(m._id),O(m)}});d.set(m._id,{upload:te,doc:m}),te.findPreviousUploads().then(v=>{v.length&&te.resumeFromPreviousUpload(v[0]),te.start()})}function B(){d.forEach(({upload:m,doc:T})=>{T.status===`error`&&(T.status=`uploading`,$.add(T._id),r$2._uploadTracker?.onProgress(T._id,0),m.start())})}window.addEventListener(`online`,B);let P=new Map,M=!1,L=!1,C=0,k=null;function t(){let m=0;return d.forEach(({doc:T})=>{T.status===`error`&&m++}),m}function o(){if(!P.size&&!M&&!L){C=0,r$2._uploadTracker?.onConnectionChange?.(null);return}C||(C=Date.now());let m=[...P.values()].reduce((J,Q)=>J===null||Q.retryAtMs<J.retryAtMs?Q:J,null),T={uploads:P.size||t(),maxAttempts:cr.length,sinceMs:C};if(M){r$2._uploadTracker?.onConnectionChange?.(s(r({},T),{phase:`reconnecting`,attempt:m?m.attempt+1:0}));return}if(L||!m){r$2._uploadTracker?.onConnectionChange?.(s(r({},T),{phase:`signed-out`,attempt:m?m.attempt+1:0,retry:()=>{F()}}));return}r$2._uploadTracker?.onConnectionChange?.(s(r({},T),{phase:`retrying`,attempt:m.attempt+1,retryAtMs:m.retryAtMs,budgetEndsAtMs:m.retryAtMs+cr.slice(m.attempt+1).reduce((J,Q)=>J+Q,0)}))}function p(m,T){let J=cr[T]??0;P.set(m,{attempt:T,retryAtMs:Date.now()+J}),o()}function b(m){P.delete(m)&&o()}function _(m){let T=m!==void 0&&P.delete(m),J=L;L=!1,(T||J)&&o()}function F(){return k??=D().finally(()=>{k=null}),k}async function D(){M=!0,o();let m=await $n();return M=!1,L=!m,m&&(B(),x.start()),o(),m}ua(`authenticated`,({authenticated:m})=>{!m||!r$2.isConnected||(L=!1,B(),x.start(),o())});function W(m){if(!m.length||!r$2._currentCol)return;let T=e.getElementById(`col-detail-grid`),J=r$2._currentCol.id,Q=[],ne=[],ie=crypto.randomUUID(),ee=m.length,te=m.reduce((v,S)=>v+S.size,0);m.forEach(v=>{let S={_id:`${ie}/${v.name}`,name:v.name,containerId:J,size:Cn(v.size),type:Ne(v.name),date:y(`format.uploadedJustNow`),status:`uploading`,jobId:ie,uploadedBy:Ee()?.name||y(`common.you`)};Q.push(S),$.add(S._id),ne.push({id:S._id,name:v.name,type:S.type})}),Z.addDocuments(J,Q),Q.forEach((v,S)=>{if(r$2._cdvCurrentView===`grid`){T.hidden=!1;let U=r$2._buildDocCard(v);T.appendChild(U),R(U)}z$1(v,m[S],J,ie,ee,te)}),r$2._cdvCurrentView===`list`&&r$2._buildDocListView(r$2._currentDocs),se(e.getElementById(`col-detail-count`),`detail.fileCount`,r$2._currentDocs.length),e.getElementById(`col-detail-empty`).hidden=!0,e.getElementById(`col-detail-select-btn`).hidden=!1,r$2._uploadTracker?.addFiles(ne,r$2._currentCol.id,r$2._currentCol.name),x.start()}function re(m){Array.from(m).forEach(T=>{q.find(J=>J.name===T.name)||q.push(T)}),Y()}function Y(){g.disabled=q.length===0,q.length?se(g,`upload.uploadCount`,q.length):X(g,`detail.upload`),q.length?(l.innerHTML=q.map(m=>`<div class="lq-upload-file-row">
            <i data-icon="col-doc-${Ne(m.name)}"></i>
            <span class="lq-upload-file-row__name">${m.name}</span>
          </div>`).join(``),R(l),l.hidden=!1):l.hidden=!0}function de(){r$2._currentCol?.currentUserRole!==`reader`&&(q=[],Y(),xe(e,`col-upload-backdrop`,`col-upload-modal`,ce))}function ce(){we(e,`col-upload-backdrop`,`col-upload-modal`)}function be(){q.length&&(W(q),ce())}e.getElementById(`btn-col-upload-close`).addEventListener(`click`,ce),f.addEventListener(`click`,ce),g.addEventListener(`click`,be),n.addEventListener(`click`,ce),i.addEventListener(`click`,()=>c.click()),i.addEventListener(`keydown`,m=>{(m.key===`Enter`||m.key===` `)&&(m.preventDefault(),c.click())}),c.addEventListener(`change`,()=>{c.files&&c.files.length&&re(c.files),c.value=``}),i.addEventListener(`dragover`,m=>{m.preventDefault(),i.classList.add(`lq-upload-dropzone--dragover`)}),i.addEventListener(`dragleave`,()=>{i.classList.remove(`lq-upload-dropzone--dragover`)}),i.addEventListener(`drop`,m=>{m.preventDefault(),i.classList.remove(`lq-upload-dropzone--dragover`),m.dataTransfer&&m.dataTransfer.files.length&&re(m.dataTransfer.files)}),e.getElementById(`col-detail-upload`).addEventListener(`click`,de)})()}var Nn=null;function Mt(){return Nn??=dn(),Nn}var Oe=class extends HTMLElement{_initialized=!1;_pickerContainer;_tooltip;_colCurrentView;_colGridBuilt;_colListBuilt;_showList;_hideList;_buildCollectionCard;_updateColTabCounts;_exitColSelection;_updateColSelCount;_closeColDeleteModal;_currentCol;_currentDocs;_cdvCurrentView;_cdvListBuilt;_openColDetail;_closeColDetail;_refreshCdvEmpty;_buildDocCard;_buildDocListView;_exitDocSelection;_openRefDocPreview;_closeColDocPreview;_syncColDocPreviewView;_uploadTracker;_startUploadPolling;_stopUploadPolling;constructor(){super(),this.attachShadow({mode:`open`})}connectedCallback(){if(this._initialized){this._startUploadPolling?.(),Ce(this.shadowRoot);return}this._initialized=!0,Ee();let e=this.shadowRoot;Le(e),e.appendChild(Mt().content.cloneNode(!0)),this._pickerContainer=document.createElement(`div`),this._pickerContainer.className=`lq-picker-container`,e.appendChild(this._pickerContainer),this._tooltip=fn(e),En(this),Dn(this),Tn(this),An(this),Fn(this),Ce(e),this._showList()}disconnectedCallback(){this._stopUploadPolling?.(),De(this.shadowRoot)}showList(){return this._showList()}hideList(){this._hideList()}async showDetail(e){await Z.ensureLoaded();let n=Z.get(e);if(!n)try{n=await Z.fetchContainer(e)}catch{n=null}n&&this._openColDetail(n)}hideDetail(){this._closeColDetail()}openDocumentPreview(e){this._openRefDocPreview(e)}closeDocumentPreview(){this._closeColDocPreview()}get collections(){return Z.getAll()}};var Hr=class extends HTMLElement{_container;connectedCallback(){if(this.shadowRoot)return;let e=this.attachShadow({mode:`open`});Le(e),Ce(e),this.style.position=`fixed`,this.style.inset=`0`,this.style.pointerEvents=`none`,this.style.zIndex=`10000`,this._container=document.createElement(`div`),this._container.className=`lq-picker-container`,e.appendChild(this._container)}};var Mr=`lexiq-collections-overlay-root`;function Vt(){typeof customElements>`u`||customElements.get(Mr)||customElements.define(Mr,Hr)}var Ae=null;function Zn(){return Vt(),Ae||(Ae=document.createElement(Mr),document.body.appendChild(Ae)),Ae.shadowRoot||Ae.connectedCallback(),Ae._container}function On(){return Z.getAll().filter(r=>r.currentUserRole!==`reader`)}var Vr=`<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.20005 1.40039C3.42786 1.40039 2.80005 2.0282 2.80005 2.80039V11.9004C2.80005 12.152 2.93567 12.386 3.15442 12.5085C3.37317 12.631 3.64224 12.6288 3.8588 12.4998L7.00005 10.6163L10.1391 12.4998C10.3557 12.6288 10.6247 12.6332 10.8435 12.5085C11.0622 12.3838 11.2 12.152 11.2 11.9004V2.80039C11.2 2.0282 10.5722 1.40039 9.80005 1.40039H4.20005Z" fill="currentColor"/>
</svg>`;var Un=new WeakMap;function jn(r){if(r.mobileSheet)return r.mobileSheet;let e=r.root||(r.container?r.container.getRootNode():null);if(!e)return null;let n=Un.get(e);return n||(n=wn(e),Un.set(e,n)),n}function Dr(r){return r.container||Zn()}function Tr(){return window.innerWidth<=768}function Gn(r){let e=`<i data-icon="${r.icon}"></i>`,n=document.createElement(`div`);return n.className=`lq-collection-card__item`,n.dataset.colId=r.id,n.innerHTML=`<span class="lq-collection-card__item-icon">${e}</span><span class="lq-collection-card__item-name">${r.name}</span><button class="lq-btn lq-btn--secondary lq-btn--sm lq-btn--icon lq-collection-card__add-btn"><i data-icon="btn-add"></i></button>`,n.querySelector(`.lq-collection-card__add-btn`).addEventListener(`click`,i=>Tt(i)),R(n),n}function Dt(r$3){return!r$3||!r$3.length?[]:r$3.map(e=>r({_id:e._id||`saved-`+Date.now()+`-`+Math.random().toString(36).slice(2)},e))}async function Tt(r){let e=r.currentTarget,n=e.closest(`.lq-collection-card`),i=e.closest(`.lq-collection-card__item`),c=i.querySelector(`.lq-collection-card__item-name`).textContent.trim(),l=n.querySelector(`.lq-collection-card__error`);oe(l),ae(e,!0);try{n._documents&&n._documents.length&&await Z.saveDocuments(i.dataset.colId||``,n._documents)}catch(g){ae(e,!1),ue(l,ge(g));return}ae(e,!1);let f=n.querySelector(`.lq-collection-card__saved-label`);f.innerHTML=y(`picker.addedTo`,{name:`<strong>${K(c)}</strong>`}),e.dataset.added=`1`,e.classList.replace(`lq-btn--secondary`,`lq-btn--primary`),e.innerHTML=`<i data-icon="btn-check"></i>`,R(e),setTimeout(()=>{Pe(n._saveBtn),n._onSave?.(c)},900)}function Wn(r){if(r.querySelector(`.lq-collection-card__new-wrap`))return;let e=r.querySelector(`.lq-collection-card__list`),n=r.querySelector(`.lq-collection-card__section-head`);e.classList.add(`lq-collection-card__list--dimmed`),n.hidden=!0;let i=document.createElement(`div`);i.className=`lq-collection-card__new-wrap`,i.innerHTML=`<div class="lq-collection-card__new-form-header"><span class="lq-collection-card__new-form-label" data-i18n="picker.collectionName">${K(y(`picker.collectionName`))}</span></div><div class="lq-collection-card__new-form-row"><div class="oc-input-wrap oc-input-size-md lq-collection-card__new-field"><input class="oc-input-control" data-i18n-attr="placeholder:picker.namePlaceholder" placeholder="${K(y(`picker.namePlaceholder`))}" maxlength="50" autocomplete="off"></div><button class="lq-btn lq-btn--secondary lq-btn--md lq-btn--icon lq-collection-card__new-cancel"><i data-icon="panel-close"></i></button><button class="lq-btn lq-btn--primary lq-btn--md lq-btn--icon lq-collection-card__new-confirm" disabled><i data-icon="btn-check"></i></button></div><p class="lq-collection-card__new-semantic" hidden></p>`,R(i),e.before(i);let c=y(`picker.duplicateName`),l=i.querySelector(`input`),f=i.querySelector(`.lq-collection-card__new-field`),g=i.querySelector(`.lq-collection-card__new-confirm`),q=i.querySelector(`.lq-collection-card__new-semantic`),V=!1;l.focus();function I(){return Array.from(e.querySelectorAll(`.lq-collection-card__item-name`)).map(a=>(a.textContent||``).trim().toLowerCase())}function H(a){let s=a.trim();return s?I().includes(s.toLowerCase())?(f.classList.add(`oc-input-wrap--error`),ue(q,c),g.disabled=!0,!1):(f.classList.remove(`oc-input-wrap--error`),oe(q),g.disabled=!1,!0):(f.classList.remove(`oc-input-wrap--error`),oe(q),g.disabled=!0,!1)}l.addEventListener(`input`,()=>H(l.value));function O(){i.remove(),e.classList.remove(`lq-collection-card__list--dimmed`),n.hidden=!1}function $(){V||O()}async function d(){if(!V&&H(l.value)){V=!0,ae(g,!0);try{let s=Gn(await Z.create({name:l.value.trim()}));s.classList.add(`lq-collection-card__item--new`),e.prepend(s),e.scrollTop=0,O()}catch(a){f.classList.add(`oc-input-wrap--error`),ue(q,ge(a))}finally{V=!1,ae(g,!1)}}}i.querySelector(`.lq-collection-card__new-cancel`).addEventListener(`click`,$),g.addEventListener(`click`,d),l.addEventListener(`keydown`,a=>{a.key===`Enter`&&(a.preventDefault(),d()),a.key===`Escape`&&$()})}function Yn(r,e){let n=document.createElement(`div`);n.className=`lq-collection-card`,n.innerHTML=`<div class="lq-collection-card__header"><span class="lq-collection-card__saved-label">${y(`picker.savedTo`,{name:`<strong>${K(y(`picker.quickCollection`))}</strong>`})}</span><button class="lq-btn lq-btn--tertiary-neutral lq-btn--sm lq-btn--icon lq-collection-card__unsave-btn">${Vr}</button></div><div class="lq-collection-card__body"><div class="lq-collection-card__section-head"><span class="lq-collection-card__section-title" data-i18n="list.title">${K(y(`list.title`))}</span><button class="lq-btn lq-btn--tertiary lq-btn--sm lq-collection-card__new-btn" data-i18n="picker.newCollection">${K(y(`picker.newCollection`))}</button></div><div class="lq-collection-card__list"></div><p class="lq-collection-card__error" hidden></p></div>`;let i=n.querySelector(`.lq-collection-card__list`);return On().forEach(c=>i.appendChild(Gn(c))),n._saveBtn=r,n._onSave=e.onSave||null,n._documents=Dt(e.documents),n.querySelector(`.lq-collection-card__unsave-btn`).addEventListener(`click`,()=>Ar(r,e)),n.querySelector(`.lq-collection-card__new-btn`).addEventListener(`click`,()=>Wn(n)),n}function Pe(r){if(!r)return;let e=r._cardMobileSheet;if(Tr()&&r._collectionCard&&e){r._collectionCard=null,r._cardMobileSheet=null,e.close();return}if(r._cardScrollHandler&&(r._cardScrollTarget?.removeEventListener(`scroll`,r._cardScrollHandler),r._cardScrollHandler=null),r._cardOutsideClick&&(document.removeEventListener(`mousedown`,r._cardOutsideClick),r._cardOutsideClick=null),r._collectionCard){let n=r._collectionCard;r._collectionCard=null,n.classList.remove(`lq-collection-card--open`),setTimeout(()=>n.remove(),160)}}function Ar(r$4,e={}){if(r$4.dataset.saved){clearTimeout(r$4._saveT1),clearTimeout(r$4._saveT2),delete r$4.dataset.saved,r$4.classList.remove(`lq-btn--saved`,`lq-btn--copy-exit`),r$4.innerHTML=`<i data-icon="bookmark-plus-reg"></i>`,R(r$4),Pe(r$4),e.onUnsave?.();return}r$4.dataset.saved=`1`,r$4.classList.add(`lq-btn--saved`),r$4.innerHTML=Vr+`<span class="lq-copy-label" data-i18n="picker.saved">${K(y(`picker.saved`))}</span>`,r$4._saveT1=setTimeout(()=>{r$4.classList.add(`lq-btn--copy-exit`),r$4._saveT2=setTimeout(()=>{r$4.classList.remove(`lq-btn--copy-exit`),r$4.innerHTML=Vr},240)},2e3);let n=Yn(r$4,e);r$4._collectionCard=n;let i=Dr(e);if(Tr()){let g=jn(s(r({},e),{container:i}));r$4._cardMobileSheet=g,g?.open(n,y(`picker.saveToCollection`),r$4);return}function c(){let g=i.getBoundingClientRect(),q=r$4.getBoundingClientRect();n.style.top=q.bottom-g.top+8+`px`}function l(g){let q=g.composedPath();!q.includes(n)&&!q.includes(r$4)&&Pe(r$4)}c(),i.appendChild(n);let f=e.scrollContainer||i;f.addEventListener(`scroll`,c),r$4._cardScrollHandler=c,r$4._cardScrollTarget=f,requestAnimationFrame(()=>{n.classList.add(`lq-collection-card--open`),document.addEventListener(`mousedown`,l),r$4._cardOutsideClick=l})}function Kn(r,e={}){if(r._collectionCard)return;let n=Yn(r,e);n.querySelector(`.lq-collection-card__header`).hidden=!0,n.classList.add(`lq-collection-card--above`),r._collectionCard=n;let i=Dr(e);function c(){let f=i.getBoundingClientRect(),g=r.getBoundingClientRect();n.style.top=`auto`,n.style.bottom=f.bottom-g.top+8+`px`}function l(f){let g=f.composedPath();!g.includes(n)&&!g.includes(r)&&Pe(r)}c(),i.appendChild(n),requestAnimationFrame(()=>{n.classList.add(`lq-collection-card--open`),document.addEventListener(`mousedown`,l),r._cardOutsideClick=l})}var je=null;var Ge=null;function We(){if(Ge&&(document.removeEventListener(`mousedown`,Ge),Ge=null),je){je.classList.remove(`lq-collection-card--open`);let r=je;je=null,setTimeout(()=>r.remove(),160)}}function Xn(r,e=[],n={}){We();let i=Tr(),c=jn(n),l=i&&c?()=>c.close():We,f=document.createElement(`div`);f.className=`lq-collection-card__body`,f.innerHTML=`<div class="lq-collection-card__section-head"><span class="lq-collection-card__section-title" data-i18n="list.title">${K(y(`list.title`))}</span><button class="lq-btn lq-btn--tertiary lq-btn--sm lq-collection-card__new-btn" data-i18n="picker.newCollection">${K(y(`picker.newCollection`))}</button></div><div class="lq-collection-card__list"></div><p class="lq-collection-card__error" hidden></p>`;let g=f.querySelector(`.lq-collection-card__list`),q=f.querySelector(`.lq-collection-card__error`),V=i?`lq-btn--md`:`lq-btn--sm`;if(On().forEach($=>{if(n.fromCollectionId!=null&&$.id===n.fromCollectionId)return;let d=document.createElement(`div`);d.className=`lq-collection-card__item`,d.innerHTML=`<span class="lq-collection-card__item-icon"><i data-icon="${$.icon}"></i></span><span class="lq-collection-card__item-name">${$.name}</span><button class="lq-btn lq-btn--secondary ${V} lq-btn--icon lq-collection-card__add-btn"><i data-icon="btn-add"></i></button>`,d.querySelector(`.lq-collection-card__add-btn`).addEventListener(`click`,async a=>{let s=a.currentTarget;oe(q),ae(s,!0);try{if(n.fromCollectionId!=null){let h=e.map(x=>x.dataset.docId).filter(x=>!!x);h.length&&await Z.moveDocuments(n.fromCollectionId,$.id,h)}}catch(h){ae(s,!1),ue(q,ge(h));return}ae(s,!1),s.classList.replace(`lq-btn--secondary`,`lq-btn--primary`),s.innerHTML=`<i data-icon="btn-check"></i>`,R(s),setTimeout(()=>{l(),e.forEach(h=>h.classList.add(`lq-doc-card--bubble-out`)),setTimeout(()=>{e.forEach(h=>h.remove()),n.onMoved&&n.onMoved()},350)},700)}),R(d),g.appendChild(d)}),f.querySelector(`.lq-collection-card__new-btn`).addEventListener(`click`,()=>Wn(f)),i&&c){c.open(f,y(`picker.moveToCollection`),r);return}let I=document.createElement(`div`);I.className=`lq-collection-card`,I.appendChild(f);let H=Dr(n),O=r.getBoundingClientRect();I.style.position=`fixed`,I.style.right=`auto`,I.style.top=O.bottom+4+`px`,I.style.left=Math.max(4,O.right-300)+`px`,je=I,Ge=$=>{let d=$.composedPath();!d.includes(I)&&!d.includes(r)&&We()},H.appendChild(I),requestAnimationFrame(()=>{I.classList.add(`lq-collection-card--open`),document.addEventListener(`mousedown`,Ge)})}var Ye=class extends HTMLElement{_initialized=!1;_container;constructor(){super(),this.attachShadow({mode:`open`})}connectedCallback(){Ce(this.shadowRoot),!this._initialized&&(this._initialized=!0,Le(this.shadowRoot),this._container=document.createElement(`div`),this._container.className=`lq-picker-container`,this.shadowRoot.appendChild(this._container))}disconnectedCallback(){De(this.shadowRoot)}_withEvents(e){return s(r({},e),{container:this._container,onSave:n=>this.dispatchEvent(new CustomEvent(`save`,{detail:{name:n},bubbles:!0,composed:!0})),onUnsave:()=>this.dispatchEvent(new CustomEvent(`unsave`,{bubbles:!0,composed:!0})),onMoved:()=>{e.onMoved?.(),this.dispatchEvent(new CustomEvent(`moved`,{bubbles:!0,composed:!0}))}})}openSaveCard(e,n={}){Kn(e,this._withEvents(n))}closeSaveCard(e){Pe(e)}triggerSaveFeedback(e,n={}){Ar(e,this._withEvents(n))}openMoveMenu(e,n,i={}){Xn(e,n,this._withEvents(i))}closeMoveMenu(){We()}};var Ke=class extends HTMLElement{_initialized=!1;_list;_onSelectionChanged;_onCreated;_onCollectionsLoaded;constructor(){super(),this.attachShadow({mode:`open`})}connectedCallback(){this._initialized||(this._initialized=!0,Le(this.shadowRoot),this._list=document.createElement(`div`),this._list.className=`lq-mention-list oc-scrollable`,this.shadowRoot.appendChild(this._list),this._build()),Ce(this.shadowRoot),this._onSelectionChanged=()=>this._syncChecks(),Z.addEventListener(`selection-changed`,this._onSelectionChanged),Z.addEventListener(`collection-created`,this._onCreated=()=>this._build()),Z.addEventListener(`collections-loaded`,this._onCollectionsLoaded=()=>this._build())}disconnectedCallback(){De(this.shadowRoot),Z.removeEventListener(`selection-changed`,this._onSelectionChanged),Z.removeEventListener(`collection-created`,this._onCreated),Z.removeEventListener(`collections-loaded`,this._onCollectionsLoaded)}_renderMessage(e){let n=y(e);this._list.innerHTML=`<div class="oc-list-item oc-list-item-l"><div class="oc-list-item-left"><div class="oc-list-item-text-block"><span class="oc-list-item-text">${n}</span></div></div></div>`}async _build(){this._renderMessage(`mention.loading`);try{await Z.ensureLoaded()}catch{this._renderMessage(`mention.loadError`);return}this._list.innerHTML=``,Z.getAll().forEach(e=>this._list.appendChild(this._buildRow(e)))}_buildRow(e){let n=document.createElement(`div`);n.className=`oc-list-item oc-list-item-l`,n.dataset.id=e.id,n.dataset.name=e.name.toLowerCase();let i=document.createElement(`div`);i.className=`oc-list-item-left`;let c=document.createElement(`label`);c.className=`oc-checkbox-root`;let l=document.createElement(`input`);l.type=`checkbox`,l.className=`oc-checkbox-input`,l.checked=Z.selectedIds.has(e.id);let f=document.createElement(`span`);f.className=`oc-checkbox-hitbox`;let g=document.createElement(`span`);g.className=`oc-checkbox-control`;let q=document.createElement(`span`);q.className=`oc-checkbox-icon oc-checkbox-icon-check`,q.innerHTML=`<i data-icon="checkbox-check"></i>`;let V=document.createElement(`span`);V.className=`oc-checkbox-icon oc-checkbox-icon-minus`,V.innerHTML=`<i data-icon="checkbox-minus"></i>`,g.appendChild(q),g.appendChild(V),f.appendChild(g),c.appendChild(l),c.appendChild(f),R(c);let I=document.createElement(`div`);I.className=`oc-list-item-text-block`;let H=document.createElement(`span`);H.className=`oc-list-item-text`,H.textContent=e.name;let O=document.createElement(`span`);return O.className=`oc-list-item-subtext`,se(O,`mention.documentCount`,e.docs),I.appendChild(H),I.appendChild(O),i.appendChild(c),i.appendChild(I),n.appendChild(i),n.classList.toggle(`oc-list-item-selected`,l.checked),l.addEventListener(`change`,()=>{Z.toggleSelected(e.id,l.checked),n.classList.toggle(`oc-list-item-selected`,l.checked),this._dispatchSelectionChanged()}),n.addEventListener(`click`,$=>{c.contains($.target)||(l.checked=!l.checked,l.dispatchEvent(new Event(`change`)))}),n}_syncChecks(){this._list.querySelectorAll(`[data-id]`).forEach(e=>{let n=e,i=n.dataset.id??``,c=Z.selectedIds.has(i),l=n.querySelector(`input[type="checkbox"]`);l&&(l.checked=c),n.classList.toggle(`oc-list-item-selected`,c)})}_dispatchSelectionChanged(){this.dispatchEvent(new CustomEvent(`selection-changed`,{detail:{ids:[...Z.selectedIds],count:Z.selectedCount},bubbles:!0,composed:!0}))}get items(){return Z.getAll().map(e=>({id:e.id,icon:e.icon,name:e.name,desc:pe(`mention.documentCount`,e.docs)}))}selectById(e){Z.toggleSelected(e,!0),this._syncChecks(),this._dispatchSelectionChanged()}};function Jn(r=`lexiq-collections`){typeof customElements>`u`||customElements.get(r)||customElements.define(r,Oe)}function Qn(r=`lexiq-collection-picker`){typeof customElements>`u`||customElements.get(r)||customElements.define(r,Ye)}function et(r=`lexiq-collection-mention-list`){typeof customElements>`u`||customElements.get(r)||customElements.define(r,Ke)}function Pr(){Jn(),Qn(),et()}export{Qn as a,er as c,Pr as i,et as l,Ke as n,Ye as o,Oe as r,Z as s,Jn as t};
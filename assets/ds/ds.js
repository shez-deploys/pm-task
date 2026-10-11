/* Optional, dependency-free behavior. No window globals or document-wide handlers. */
(() => {
  'use strict';
  const dsBoot = () => document.querySelectorAll('.ds-system').forEach(dsRoot => {
    if (dsRoot.dataset.dsReady) return;
    dsRoot.dataset.dsReady = 'true';
    let dsToastTimer;
    const dsFind = dsId => [...dsRoot.querySelectorAll('[id]')].find(dsElement => dsElement.id === dsId);
    const dsActivateTab = dsTab => {
      const dsList = dsTab.closest('[role="tablist"]');
      dsList.querySelectorAll('[role="tab"]').forEach(dsItem => {
        const dsSelected = dsItem === dsTab;
        dsItem.setAttribute('aria-selected', String(dsSelected));
        dsItem.tabIndex = dsSelected ? 0 : -1;
        const dsPanel = dsFind(dsItem.getAttribute('aria-controls'));
        if (dsPanel) dsPanel.hidden = !dsSelected;
      });
    };
    dsRoot.addEventListener('click', dsEvent => {
      const dsTab = dsEvent.target.closest('.ds-tab[role="tab"]');
      if (dsTab) dsActivateTab(dsTab);
      const dsOpener = dsEvent.target.closest('[data-ds-open]');
      if (dsOpener) {
        const dsDialog = dsFind(dsOpener.dataset.dsOpen);
        if (dsDialog?.tagName === 'DIALOG') { dsDialog.dsOpener = dsOpener; dsDialog.showModal(); }
      }
      const dsCloser = dsEvent.target.closest('[data-ds-close]');
      if (dsCloser) dsCloser.closest('dialog')?.close();
      const dsToastButton = dsEvent.target.closest('[data-ds-toast]');
      if (dsToastButton) {
        const dsToast = dsRoot.querySelector('[data-ds-toast-region]');
        if (dsToast) {
          clearTimeout(dsToastTimer);
          dsToast.hidden = false;
          dsToast.textContent = dsToastButton.dataset.dsToast;
          dsToastTimer = setTimeout(() => { dsToast.hidden = true; dsToast.textContent = ''; }, 5000);
        }
      }
    });
    dsRoot.addEventListener('keydown', dsEvent => {
      const dsTab = dsEvent.target.closest('.ds-tab[role="tab"]');
      if (!dsTab || !['ArrowLeft','ArrowRight','Home','End'].includes(dsEvent.key)) return;
      const dsTabs = [...dsTab.closest('[role="tablist"]').querySelectorAll('[role="tab"]')];
      let dsIndex = dsTabs.indexOf(dsTab);
      if (dsEvent.key === 'Home') dsIndex = 0;
      else if (dsEvent.key === 'End') dsIndex = dsTabs.length - 1;
      else dsIndex = (dsIndex + (dsEvent.key === 'ArrowRight' ? 1 : -1) + dsTabs.length) % dsTabs.length;
      dsEvent.preventDefault(); dsActivateTab(dsTabs[dsIndex]); dsTabs[dsIndex].focus();
    });
    dsRoot.querySelectorAll('.ds-dialog').forEach(dsDialog => {
      dsDialog.addEventListener('close', () => dsDialog.dsOpener?.focus());
    });
    // Opt-in table filtering. Labels and status remain visible to screen readers.
    dsRoot.querySelectorAll('[data-ds-filter]').forEach(dsInput => {
      const dsTable = dsFind(dsInput.dataset.dsFilter);
      if (!dsTable) return;
      dsInput.addEventListener('input', () => {
        const dsQuery = dsInput.value.trim().toLowerCase();
        let dsCount = 0;
        dsTable.querySelectorAll('tbody tr').forEach(dsRow => {
          dsRow.hidden = !dsRow.textContent.toLowerCase().includes(dsQuery);
          if (!dsRow.hidden) dsCount++;
        });
        const dsStatus = dsFind(dsInput.dataset.dsFilterStatus);
        if (dsStatus) dsStatus.textContent = `${dsCount} contact${dsCount === 1 ? '' : 's'} shown`;
      });
    });
  });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', dsBoot, {once:true});
  else dsBoot();
})();

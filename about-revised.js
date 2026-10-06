// Preview interactions only; no authentication, database or payment writes.
(() => {
  const navbar = document.getElementById('navbar');
  const dialog = document.getElementById('mobileNav');
  const trigger = document.getElementById('hamburger');
  const closeButton = dialog.querySelector('.m-close');
  const main = document.getElementById('about-main');
  const footer = document.querySelector('footer');
  let previousOverflow = '';

  const focusable = () => [...dialog.querySelectorAll('a[href], button, summary')]
    .filter(el => el.getClientRects().length > 0);
  function closeMenu() {
    if (!dialog.classList.contains('open')) return;
    dialog.classList.remove('open');
    dialog.inert = true;
    trigger.setAttribute('aria-expanded', 'false');
    main.inert = footer.inert = navbar.inert = false;
    document.body.style.overflow = previousOverflow;
    trigger.focus();
  }
  trigger.addEventListener('click', () => {
    previousOverflow = document.body.style.overflow;
    dialog.inert = false;
    dialog.classList.add('open');
    trigger.setAttribute('aria-expanded', 'true');
    main.inert = footer.inert = navbar.inert = true;
    document.body.style.overflow = 'hidden';
    closeButton.focus();
  });
  closeButton.addEventListener('click', closeMenu);
  dialog.addEventListener('keydown', event => {
    if (event.key === 'Escape') { event.preventDefault(); closeMenu(); }
    if (event.key !== 'Tab') return;
    const items = focusable();
    const first = items[0], last = items.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });
  window.matchMedia('(min-width: 1201px)').addEventListener('change', event => {
    if (event.matches) closeMenu();
  });
  document.querySelectorAll('.nav-item').forEach(item => {
    const button = item.querySelector('button');
    const setOpen = open => {
      item.classList.toggle('is-open', open);
      button.setAttribute('aria-expanded', String(open));
    };
    button.addEventListener('click', () => setOpen(true));
    item.addEventListener('mouseenter', () => setOpen(true));
    item.addEventListener('mouseleave', () => {
      if (!item.contains(document.activeElement)) setOpen(false);
    });
    item.addEventListener('focusin', () => setOpen(true));
    item.addEventListener('focusout', event => {
      if (!item.contains(event.relatedTarget)) setOpen(false);
    });
    item.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        button.focus();
        setOpen(false);
      }
    });
  });
  window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', window.scrollY > 60), { passive: true });
})();

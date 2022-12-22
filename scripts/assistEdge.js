var headerHeight = $('header').outerHeight();
var scrollPos = $(window).scrollTop();
var wWidth = $(window).width();
var curDate, curTime, curTime24HrFormat;

$(document).ready(function () {
    skipContent();
    hamBurger();
    accessibility();
    accordion();
    editAccordion();
    dropdown();
    autoSuggest();
    tab();
    treeList();
    //    nav();
    navigateWithNav();
    toggleSwitcher();
    siteNavCollapseBtn();
    overflowMenu();
    closeOnGenericClick();
    globalSearch();
    tag();
    floater();
    ariaInvalid();
    keyboard();
    chipsTags();
    textarea();
    expandCollapse();
    // editFormOnNeed();
    editStatus();
    guidedHelp();
    treeViewWithTab();
    quickHelp();
});


// START: Skip to Main Content
function skipContent() {

    $(document).ready(function () {
        $('.skip-main').focusin(function () {
            $(this).closest('.skip-content').addClass('show');
        });

        $(document).on('keydown', '.skip-content .list-item', function (e) {
            var ele, currentItem, totalItem;
            ele = $(this);
            currentItem = ele.parent('.list-group-item').index() + 1;
            totalItem = ele.closest('.skip-content').find('.list-item').length;
            if (e.keyCode === 40) { //Down Arrow
                e.preventDefault();
                currentItem = currentItem + 1;
                ele.closest('.skip-content').find('.list-group-item:nth-child(' + currentItem + ') .list-item').focus();
                if (totalItem < currentItem) {
                    ele.closest('.skip-content').find('.list-group-item:first-child .list-item').focus();
                }
            } else if (e.keyCode === 38) { //Up Arrow
                e.preventDefault();
                currentItem = currentItem - 1;
                ele.closest('.skip-content').find('.list-group-item:nth-child(' + currentItem + ') .list-item').focus();
                if (currentItem <= 0) {
                    ele.closest('.skip-content').find('.list-group-item:last-child .list-item').focus();
                }
            } else if (e.which == 13) {
                e.preventDefault();
                $('.skip-content').removeClass('show');
                ele.trigger('click');
            } else if (e.which == 27 || e.which == 9) {
                e.preventDefault();
                $('.skip-content').removeClass('show');
                $('body').find('header .logo').focus();
            }
            return false;
        });
    });

    $(document).on('click', '.skip-content .list-item', function (e) {
        var ele = $(this);
        $('.skip-content').removeClass('show');
        if (ele.hasClass('skip-main')) {
            $('body').find('main .shown .section-heading').focus();
        } else if (ele.hasClass('skip-search')) {
            $('body').find('header .search-wrapper .form-control').focus();
        } else if (ele.hasClass('skip-navigation')) {
            $('body').find('.site-navigation .ae-nav-item-wrapper .ae-nav-item:first-child').focus();
        }
    });
}
// END: Skip to Main Content

//START: Hamburger Menu
function hamBurger() {
    $(document).on('click', '.hamburger-menu', function () {
        $('body').toggleClass('no-scroll');
    });
}
//START: Hamburger Menu

//START: Toggle Show
function toggleShow(ele) {
    $(ele).toggleClass('show');
}
//END: Toggle Show

//START: Accessbility Function
function accessibility() {
    var ele;

    $('.disabled').each(function () { // Adding aria tag for disabled fields
        ele = $(this);
        ele.attr("aria-disabled", "true");
        ele.find('input').attr("aria-disabled", "true");
    });
    //Disabled Element functionality
    $(document).on('keydown', '.disabled', function (e) {
        ele = $(this);
        ele.unbind('click');
    });

    $('.non-editable').each(function () { // Adding aria tag for disabled fields
        ele = $(this);
        ele.find('.form-control').attr("readonly", "readonly");
        ele.find('.form-control').attr("aria-disabled", "true");
    });
    $('.readonly').each(function () {
        ele = $(this);
        ele.find('.form-control').attr("readonly", "readonly");
    });

    $(document).on('keydown', '.non-editable', function (e) {
        if (e.keyCode === 13 || e.keyCode === 32) {
            e.preventDefault();
            return false;
        }
    });
    $('.non-editable').find('input[type="checkbox"]').on('click', function (e) {
        console.log('Sid');
        e.preventDefault();
    })

    $(document).on('keydown', '.form-control:input[type="number"]', function (e) {
        if (e.keyCode === 40 || e.keyCode === 38) {
            e.preventDefault();
            return false;
        }
    });

    //Accordion - Aria tag for states
    $('.ae-accordion-wrapper').each(function () {
        ele = $(this);
        if (ele.hasClass('success')) {
            ele.find('.ae-accordion-header .tooltip-wrapper').attr('aria-label', 'success');
        } else if (ele.hasClass('warning')) {
            ele.find('.ae-accordion-header .tooltip-wrapper').attr('aria-label', 'warning');
        } else if (ele.hasClass('error')) {
            ele.find('.ae-accordion-header .tooltip-wrapper').attr('aria-label', 'error');
        }
    });
    //Accordion Key functionality
    $(document).on('keydown', '.accordion-action-panel', function (e) {
        var ele, currentAccordion, totalAccordion;
        ele = $(this).closest('.ae-accordion-block');
        currentAccordion = ele.find('.accordion-action-panel:focus').parent('.ae-accordion-wrapper').index() + 1; //Getting Focused Accordion Index
        totalAccordion = ele.closest('.ae-accordion-block').find('.ae-accordion-wrapper').length; //Total accordion length
        if (ele.find('.ae-accordion-wrapper .accordion-action-panel:focus').focus()) {
            if (e.keyCode === 40) { //Down Arrow
                e.preventDefault();
                currentAccordion = currentAccordion + 1;
                ele.closest('.ae-accordion-block').find('.ae-accordion-wrapper:nth-child(' + currentAccordion + ') .accordion-action-panel').focus();
                if (totalAccordion < currentAccordion) {
                    ele.closest('.ae-accordion-block').find('.ae-accordion-wrapper:first-child .accordion-action-panel').focus();
                }
            } else if (e.keyCode === 38) { //Up Arrow
                e.preventDefault();
                currentAccordion = currentAccordion - 1;
                ele.closest('.ae-accordion-block').find('.ae-accordion-wrapper:nth-child(' + currentAccordion + ') .accordion-action-panel').focus();
                if (currentAccordion <= 0) {
                    ele.closest('.ae-accordion-block').find('.ae-accordion-wrapper:last-child .accordion-action-panel').focus();
                }
            } else if (e.keyCode === 36) { //Home Key
                e.preventDefault();
                ele.closest('.ae-accordion-block').find('.ae-accordion-wrapper:first-child .accordion-action-panel').focus();
            } else if (e.keyCode === 35) { //End Key
                e.preventDefault();
                ele.closest('.ae-accordion-block').find('.ae-accordion-wrapper:last-child .accordion-action-panel').focus();
            } else if (e.keyCode === 13) { //Enter Key
                e.preventDefault();
                ele.find('.accordion-action-panel:focus').trigger('click');
            }
        }
    });

    //Tooltip
    $(document).on('focusin', '.tooltip-wrapper', function () {
        ele = $(this);
        ele.addClass('show-tooltip');
        ele.find('.tooltip-block-wrapper').attr('aria-hidden', 'false');
    });

    $(document).on('keydown', '.tooltip-wrapper', function (e) {
        ele = $(this);
        if (e.keyCode === 27) { // ESC key
            e.preventDefault();
            ele.removeClass('show-tooltip');
            ele.find('.tooltip-block-wrapper').attr('aria-hidden', 'true');
        }
    });
    $(document).on('focusout', '.tooltip-wrapper', function () {
        ele = $(this);
        ele.removeClass('show-tooltip');
        ele.find('.tooltip-block-wrapper').attr('aria-hidden', 'true');
    });

    // Breadcurmb
    $(document).on('focusout', '.ae-widget-group.show .ae-widget-item:last-child', function (e) {
        ele.closest('.ae-widget-wrapper').find('.ae-widget-group').removeClass('show');
    });
    $(document).on('keyup', '.ae-widget-group.show .ae-widget-item', function (e) {
        if (e.keyCode === 27) { // ESC key
            e.preventDefault();
            ele.closest('.ae-widget-wrapper').find('.ae-widget-group').removeClass('show');
        }
    });


    $(document).on('focusin', '.breadcrumb-item .tooltip-heading a', function (e) {
        ele = $(this);
        ele.closest('.tooltip-wrapper').toggleClass('show');
    });
    $(document).on('keydown', '.tooltip-content .breadcrumb-item', function (e) {
        if (e.keyCode === 27) { // ESC key
            e.preventDefault();
            ele.closest('.tooltip-wrapper').removeClass('show');
            ele.closest('.breadcrumb').find('.active a').focus();
        }
    });
    $(document).on('focusout', '.tooltip-content .breadcrumb-item:last-child', function (e) {
        ele.closest('.tooltip-wrapper').removeClass('show');
    });
    //Button Click
    $(document).on('click', '.btn, a', function () {
        ele = $(this);
        if (ele.attr('aria-pressed') == 'true') {
            ele.attr('aria-pressed', 'false');
        } else if (ele.attr('aria-pressed') == 'false') {
            ele.attr('aria-pressed', 'true');
        }
    });
    //Checkbox Click
    $(document).on('click', 'input[type=checkbox]', function () {
        ele = $(this);
        check = ele.parent().hasClass('readonly');
        if(check) {
            return false;
        }
        if (ele.is(':checked')) {
            ele.attr('aria-checked', 'true');
        } else {
            ele.attr('aria-checked', 'false');
        }
        
    });
    //Radio Click
    $(document).on('click', 'input[type=radio]', function () {
        ele = $(this);
        check = ele.closest('.radiobutton').hasClass('readonly') || ele.closest('.toggle-wrapper').hasClass('readonly');
        if(check) return false;
        ele.attr('aria-checked', 'true');
    });

    //Modal
    $(document).on('keydown', '.ae-modal', function (e) {
        var firstFocus, lastFocus, lasttd;
        ele = $(this);
        firstFocus = ele.find('.modal-header .close').get(0);
        lastFocus = ele.find('.modal-footer .ae-action-wrapper .btn:last-child').get(0);
        lasttd = ele.find('table tbody tr:last-child td:last-child').get(0);
        if (e.keyCode === 9 && !e.shiftKey) { //Tab Arrow
            if (document.activeElement == lastFocus) {
                ele.closest('.ae-modal').find('.modal-header button').focus();
                return false;
            }
            if (document.activeElement == lasttd) {
                ele.closest('.ae-modal').find('.modal-header button').focus();
                return false;
            }
        }
        if (e.shiftKey && e.keyCode == 9) { //Shift Arrow
            if (document.activeElement === firstFocus) {
                ele.closest('.ae-modal').find('.modal-footer .btn').focus();
                return false;
            }
        }
        if (e.keyCode === 27) { //Esc Arrow
            ele.closest('.ae-modal').removeClass('show');
        }
    });



    //Notification
    $(document).on('keydown', '.ae-notification:not(.no-hide)', function (e) {
        ele = $(this);
        if (e.keyCode === 27) { //Esc Arrow
            ele.removeClass('show');
        }
    });

    //Tabs - Aria tag for states
    $('.ae-nav-tab').each(function () {
        ele = $(this);
        if (ele.hasClass('success')) {
            ele.attr('aria-roledescription', 'success');
        } else if (ele.hasClass('warning')) {
            ele.attr('aria-roledescription', 'warning');
        } else if (ele.hasClass('error')) {
            ele.attr('aria-roledescription', 'error');
        }
    });

    //Tab
    $(document).on('keydown', '.ae-nav-tab', function (e) {
        var ele, currentTab, totalTab;
        ele = $(this);
        currentTab = ele.closest('.ae-nav-tabs').find('.ae-nav-tab.selected').index() + 1; //Getting Focused Accordion Index
        totalTab = ele.closest('.ae-nav-tabs').find('.ae-nav-tab').length; //Total accordion length
        if (e.keyCode === 39 || e.keyCode === 40) { //Right Arrow
            e.preventDefault();
            resetTab(ele);
            currentTab = currentTab + 1;
            if (totalTab < currentTab) {
                ele.closest('.ae-nav-tabs').find('.ae-nav-tab:first-child').addClass('selected active');
                ele.closest('.ae-nav-tabs').find('.ae-nav-tab:first-child').attr('tabindex', '0');
                ele.closest('.ae-nav-tabs').find('.ae-nav-tab:first-child').attr('aria-selected', 'true');
                ele.closest('.ae-nav-tabs').find('.ae-nav-tab:first-child').focus();
                ele.closest('.ae-nav-wrapper').find('.ae-nav-item-wrapper .ae-nav-item:first-child').addClass('selected');
                ele.closest('.ae-nav-wrapper').find('.ae-nav-item-wrapper .ae-nav-item:first-child').attr('tabindex', '0');
                ele.closest('.ae-nav-wrapper.has-vertical-tab').find('.ae-nav-section-wrapper .ae-accordion-block .ae-accordion-wrapper:first-child').addClass('is-expanded');
                ele.closest('.ae-nav-wrapper.has-vertical-tab').find('.ae-nav-section-wrapper .ae-accordion-block .is-expanded .accordion-action-panel').attr('tabindex', '0');
                ele.closest('.ae-nav-wrapper.has-vertical-tab').find('.ae-nav-section-wrapper .ae-accordion-block .is-expanded .accordion-action-panel').attr('aria-expanded', 'true');
                return;
            }
            ele.closest('.ae-nav-tabs').find('.ae-nav-tab:nth-child(' + currentTab + ')').addClass('selected active');
            ele.closest('.ae-nav-tabs').find('.ae-nav-tab:nth-child(' + currentTab + ')').attr('tabindex', '0');
            ele.closest('.ae-nav-tabs').find('.ae-nav-tab:nth-child(' + currentTab + ')').attr('aria-selected', 'true');
            ele.closest('.ae-nav-wrapper').find('.ae-nav-item-wrapper .ae-nav-item:nth-child(' + currentTab + ')').addClass('selected');
            ele.closest('.ae-nav-wrapper').find('.ae-nav-item-wrapper:not(.ratio-builder .ae-nav-item-wrapper) .ae-nav-item:nth-child(' + currentTab + ')').attr('tabindex', '0');
            ele.closest('.ae-nav-wrapper.has-vertical-tab').find('.ae-nav-section-wrapper .ae-accordion-block .ae-accordion-wrapper:nth-child(' + currentTab + ')').addClass('is-expanded');
            ele.closest('.ae-nav-wrapper.has-vertical-tab').find('.ae-nav-section-wrapper .ae-accordion-block .is-expanded .accordion-action-panel').attr('tabindex', '0');
            ele.closest('.ae-nav-wrapper.has-vertical-tab').find('.ae-nav-section-wrapper .ae-accordion-block .is-expanded .accordion-action-panel').attr('aria-expanded', 'true');

        } else if (e.keyCode === 37 || e.keyCode === 38) { //Left Arrow and Up Arrow
            e.preventDefault();
            resetTab(ele);
            currentTab = currentTab - 1;
            ele.closest('.ae-nav-tabs').find('.ae-nav-tab:nth-child(' + currentTab + ')').addClass('selected active');
            ele.closest('.ae-nav-tabs').find('.ae-nav-tab:nth-child(' + currentTab + ')').attr('tabindex', '0');
            ele.closest('.ae-nav-tabs').find('.ae-nav-tab:nth-child(' + currentTab + ')').attr('aria-selected', 'true');
            ele.closest('.ae-nav-wrapper').find('.ae-nav-item-wrapper .ae-nav-item:nth-child(' + currentTab + ')').addClass('selected');
            ele.closest('.ae-nav-wrapper').find('.ae-nav-item-wrapper .ae-nav-item:nth-child(' + currentTab + ')').attr('tabindex', '0');
            ele.closest('.ae-nav-wrapper.has-vertical-tab').find('.ae-nav-section-wrapper .ae-accordion-block .ae-accordion-wrapper:nth-child(' + currentTab + ')').addClass('is-expanded');
            ele.closest('.ae-nav-wrapper.has-vertical-tab').find('.ae-nav-section-wrapper .ae-accordion-block .is-expanded .accordion-action-panel').attr('tabindex', '0');
            ele.closest('.ae-nav-wrapper.has-vertical-tab').find('.ae-nav-section-wrapper .ae-accordion-block .is-expanded .accordion-action-panel').attr('aria-expanded', 'true');
            if (currentTab <= 0) {
                ele.closest('.ae-nav-tabs').find('.ae-nav-tab:last-child').addClass('selected active');
                ele.closest('.ae-nav-tabs').find('.ae-nav-tab:last-child').attr('tabindex', '0');
                ele.closest('.ae-nav-tabs').find('.ae-nav-tab:last-child').attr('aria-selected', 'true');
                ele.closest('.ae-nav-wrapper').find('.ae-nav-item-wrapper .ae-nav-item:last-child').addClass('selected');
                ele.closest('.ae-nav-wrapper').find('.ae-nav-item-wrapper .ae-nav-item:last-child').attr('tabindex', '0');
                ele.closest('.ae-nav-wrapper.has-vertical-tab').find('.ae-nav-section-wrapper .ae-accordion-block .ae-accordion-wrapper:last-child').addClass('is-expanded');
                ele.closest('.ae-nav-wrapper.has-vertical-tab').find('.ae-nav-section-wrapper .ae-accordion-block .is-expanded .accordion-action-panel').attr('tabindex', '0');
                ele.closest('.ae-nav-wrapper.has-vertical-tab').find('.ae-nav-section-wrapper .ae-accordion-block .is-expanded .accordion-action-panel').attr('aria-expanded', 'true');
            }

        } else if (e.keyCode === 36) { //Home Key
            e.preventDefault();
            resetTab(ele);
            ele.closest('.ae-nav-tabs').find('.ae-nav-tab:first-child').addClass('selected active');
            ele.closest('.ae-nav-tabs').find('.ae-nav-tab:first-child').attr('tabindex', '0');
            ele.closest('.ae-nav-tabs').find('.ae-nav-tab:first-child').attr('aria-selected', 'true');
            ele.closest('.ae-nav-wrapper').find('.ae-nav-item-wrapper .ae-nav-item:first-child').addClass('selected');
            ele.closest('.ae-nav-wrapper').find('.ae-nav-item-wrapper .ae-nav-item:first-child').attr('tabindex', '0');
            ele.closest('.ae-nav-wrapper.has-vertical-tab').find('.ae-nav-section-wrapper .ae-accordion-block .ae-accordion-wrapper:first-child').addClass('is-expanded');
            ele.closest('.ae-nav-wrapper.has-vertical-tab').find('.ae-nav-section-wrapper .ae-accordion-block .is-expanded .accordion-action-panel').attr('tabindex', '0');
            ele.closest('.ae-nav-wrapper.has-vertical-tab').find('.ae-nav-section-wrapper .ae-accordion-block .is-expanded .accordion-action-panel').attr('aria-expanded', 'true');
        } else if (e.keyCode === 35) { //End Key
            e.preventDefault();
            resetTab(ele);
            ele.closest('.ae-nav-tabs').find('.ae-nav-tab:last-child').addClass('selected active');
            ele.closest('.ae-nav-tabs').find('.ae-nav-tab:last-child').attr('tabindex', '0');
            ele.closest('.ae-nav-tabs').find('.ae-nav-tab:last-child').attr('aria-selected', 'true');
            ele.closest('.ae-nav-wrapper').find('.ae-nav-item-wrapper .ae-nav-item:last-child').addClass('selected');
            ele.closest('.ae-nav-wrapper').find('.ae-nav-item-wrapper .ae-nav-item:last-child').attr('tabindex', '0');
            ele.closest('.ae-nav-wrapper.has-vertical-tab').find('.ae-nav-section-wrapper .ae-accordion-block .ae-accordion-wrapper:last-child').addClass('is-expanded');
            ele.closest('.ae-nav-wrapper.has-vertical-tab').find('.ae-nav-section-wrapper .ae-accordion-block .is-expanded .accordion-action-panel').attr('tabindex', '0');
            ele.closest('.ae-nav-wrapper.has-vertical-tab').find('.ae-nav-section-wrapper .ae-accordion-block .is-expanded .accordion-action-panel').attr('aria-expanded', 'true');
        }
        ele.closest('.ae-nav-tabs').find('.ae-nav-tab.selected.active').focus();

        if (ele.closest('.ae-nav-wrapper').find('.ae-nav-item.selected .ae-nav-wrapper').length) {
            innerNavTabIndex = ele.closest('.ae-nav-wrapper').find('.ae-nav-item.selected .ae-nav-tab.selected').index() + 1;
            ele.closest('.ae-nav-wrapper').find('.ae-nav-item.selected .ae-nav-item:nth-child(' + innerNavTabIndex + ')').addClass('selected active').attr({
                'tabindex': '0',
                'aria-selected': true,
            });
        }

    });

    function resetTab(ele) {
        ele.closest('.ae-nav-tabs').find('.ae-nav-tab').removeClass('selected active');
        ele.closest('.ae-nav-tabs').find('.ae-nav-tab').attr('tabindex', '-1');
        ele.closest('.ae-nav-tabs').find('.ae-nav-tab').attr('aria-selected', 'false');
        ele.closest('.ae-nav-wrapper').find('.ae-nav-item-wrapper .ae-nav-item').removeClass('selected');
        ele.closest('.ae-nav-wrapper').find('.ae-nav-item-wrapper .ae-nav-item').attr('tabindex', '-1');
        ele.closest('.ae-nav-wrapper.has-vertical-tab').find('.ae-nav-section-wrapper .ae-accordion-block .ae-accordion-wrapper').removeClass('is-expanded');
        ele.closest('.ae-nav-wrapper.has-vertical-tab').find('.ae-nav-section-wrapper .ae-accordion-block .accordion-action-panel').attr('tabindex', '-1');
        ele.closest('.ae-nav-wrapper.has-vertical-tab').find('.ae-nav-section-wrapper .ae-accordion-block .accordion-action-panel').attr('aria-expanded', 'false');
    }
    $(document).on('keydown', '.ae-nav-section-wrapper', function (e) {
        var ele, currentAcc;
        ele = $(this);
        currentAcc = ele.find('.ae-accordion-block .is-expanded').index() + 1; //Getting Focused Accordion Index
        if (e.keyCode === 13) { //Enter Key
            e.preventDefault();
            ele.closest('.ae-nav-wrapper').find('.ae-nav-tabs .ae-nav-tab').removeClass('selected active');
            ele.closest('.ae-nav-wrapper').find('.ae-nav-tabs .ae-nav-tab').attr('tabindex', '-1');
            ele.closest('.ae-nav-wrapper').find('.ae-nav-tabs .ae-nav-tab').attr('aria-selected', 'false');
            ele.closest('.ae-nav-wrapper').find('.ae-nav-tabs .ae-nav-tab:nth-child(' + currentAcc + ')').addClass('selected active');
            ele.closest('.ae-nav-wrapper').find('.ae-nav-tabs .ae-nav-tab:nth-child(' + currentAcc + ')').attr('tabindex', '0');
            ele.closest('.ae-nav-wrapper').find('.ae-nav-tabs .ae-nav-tab:nth-child(' + currentAcc + ')').attr('aria-selected', 'true');
        }
    });

    $(document).on('keydown', '.form-group .input-wrapper i', function (e) {
        var ele = $(this);
        if (e.keyCode === 13) { //Enter Key
            e.preventDefault();
            ele.trigger('click');
        }
    });

    //Process List - Aria tag for states
    $('.process-item').each(function () {
        ele = $(this);
        if (ele.hasClass('process-completed')) {
            ele.attr('aria-roledescription', 'Completed');
        }
    });
    $(document).on('keydown', '.process-completed', function (e) {
        ele = $(this);
        $('.process-completed').removeClass('show');
        if (e.keyCode === 9) { //Tab Key
            if (ele.find('.process-completed:focus').focus() || ele.find('.process-completed .btn:focus').focus()) {
                ele.addClass('show');
            }
        }
    });
    $(document).on('focusout', '.process-completed .btn:last-child', function () {
        ele = $(this);
        ele.closest('.process-item').removeClass('show');
    });

    //List

    $(document).on('keydown', 'ul:not(.dropdown-menu, .ae-sorting-list, .ae-nav-tabs, .skip-content, .notification-list)', function (e) {
        var totalLi, currentLi;
        ele = $(this);
        currentLi = ele.find('li:focus').index() + 1;
        totalLi = ele.find('li').length;
        if (e.keyCode === 40) { //Down
            e.preventDefault();
            currentLi = currentLi + 1;
            ele.closest('ul').find('li:nth-child(' + currentLi + ')').focus();
        } else if (e.keyCode === 38) { //Up
            e.preventDefault();
            currentLi = currentLi - 1;
            ele.closest('ul').find('li:nth-child(' + currentLi + ')').focus();
        }
    });

    //key functionality for elements with roles starting with list and menu

    $(document).on('keydown', '*[role^="list"]:not(ul),*[role^="menu"]:not(ul,.link-wrapper .overflow-list)', function (e) {

        ele = $(this);

        roles = {
            "listbox": "option",
            "list": "listitem",
            "menu": "menuitem",
            "menubar": "menuitem",
        }

        parentRole = ele.attr('role');

        currentOptions = $(document.activeElement).index() + 1;
        totalOptions = ele.find('*[role^=' + roles[parentRole] + ']').length;

        if (e.keyCode === 40) { //Down
            e.preventDefault();
            currentOptions = currentOptions + 1;
            if (currentOptions > totalOptions) {
                ele.closest('*[role^="' + parentRole + '"]').find('*[role^=' + roles[parentRole] + ']:first-child').focus();
            } else {
                ele.closest('*[role^="' + parentRole + '"]').find('*[role^=' + roles[parentRole] + ']:nth-child(' + currentOptions + ')').focus();
            }

        } else if (e.keyCode === 38) { //Up
            e.preventDefault();
            currentOptions = currentOptions - 1;
            if (currentOptions <= 0) {
                ele.closest('*[role^="' + parentRole + '"]').find('*[role^=' + roles[parentRole] + ']:last-child').focus();
            } else {
                ele.closest('*[role^="' + parentRole + '"]').find('*[role^=' + roles[parentRole] + ']:nth-child(' + currentOptions + ')').focus();
            }
        }
    });

    $(document).on('keydown', '.overflow-menu-wrapper.notification-wrapper', function (e) {
        var ele = $(this);
        var totalItem, overflowItem;
        overflowItem = ele.find('.overflow-list .overflow-list-item:focus').index() + 1;
        totalItem = ele.closest('.overflow-menu-wrapper').find('.overflow-list .overflow-list-item').length;
        if (e.keyCode === 40) {
            e.preventDefault();
            if (!(ele.find('.overflow-list .overflow-list-item:focus').length)) {
                ele.closest('.overflow-menu-wrapper').find('.overflow-list .overflow-list-item:first-child').focus();
            }
        } else if (e.keyCode === 38) {
            e.preventDefault();
            if (!(ele.find('.overflow-list .overflow-list-item:focus').length)) {
                ele.closest('.overflow-menu-wrapper').find('.overflow-list .overflow-list-item:last-child').focus();
            }
        } else if (e.keyCode === 13) {
            e.preventDefault();
            if (ele.closest('.overflow-menu-wrapper').find('.overflow-menu-link').is(":focus")) { // If button have focus
                ele.find('.overflow-menu-link').trigger('click');
            } else {
                ele.find('.overflow-list .overflow-list-item:focus').trigger('click');
            }
        } else if (e.keyCode === 27) {
            e.preventDefault();
            ele.attr('aria-expanded', false);
            ele.closest('.overflow-menu-wrapper').removeClass('show');
            ele.closest('.overflow-menu-wrapper').find('.overflow-menu-link').attr('aria-expanded', 'false');
        } else if (e.keyCode === 46) {
            e.preventDefault();
            ele.closest('.overflow-menu-wrapper').find('.overflow-list-item:focus .cancel-icon').trigger('click');
            if (overflowItem >= totalItem) {
                ele.closest('.overflow-menu-wrapper').find('.overflow-list .overflow-list-item:first-child').focus();
            } else {
                ele.closest('.overflow-menu-wrapper').find('.overflow-list .overflow-list-item:nth-child(' + overflowItem + ')').focus();
            }
        }
    });

    //Work notes 
    $(document).on('keydown', '.list-group-item .bookmark', function (e) {
        ele = $(this);
        if (e.keyCode === 9) { //Tab Arrow
            e.preventDefault();
            ele.closest('.ae-nav-wrapper').find('.ae-nav-item-wrapper .ae-nav-item.selected').focus();
        }
    });

}
//END: Accessbility Function

//START: Accordion
function accordion() {

    //Accordion click
    $(document).on('click', '.accordion-action-panel', function () {
        var headingEle;
        ele = $(this);
        ele.closest('.ae-accordion-block').find('.ae-accordion-wrapper .accordion-action-panel').attr('aria-expanded', 'false');
        if (ele.closest('.ae-accordion-block').hasClass('expand-collapse-block') || ele.closest('.ae-accordion-block').hasClass('accordion-expand-collapse-block')) {
            ele.closest('.ae-accordion-wrapper').toggleClass('is-expanded');
        } else {
            ele.closest('.ae-accordion-block').find('.ae-accordion-wrapper').removeClass('is-expanded');
            ele.closest('.ae-accordion-wrapper').addClass('is-expanded');
        }
        ele.closest('.ae-accordion-block').find('.is-expanded .accordion-action-panel').attr('aria-expanded', 'true');
    });

}
//END: Accordion

//START: Edit Contents in Accordion
function editAccordion() {
    var ele;
    $(document).on('click', '.accordion-action-panel .ae-action-wrapper .edit-btn', function () {
        ele = $(this);
        ele.closest('.ae-accordion-wrapper').find('.form-group').removeClass('readonly');
        ele.closest('.ae-accordion-wrapper').find('.form-group input').removeAttr('readonly');
    });
}
//END: Edit Contents in Accordion


//START:Dropdown
function dropdown() {
    var ele, eleVal, multiSelectedString, dropdownItem, totalItem, hoveredIndex, totalSelectedItemCount, spanCount, slicedText;
    var multiSelectedItem = [];
    var match = 0;

    //Clear All button functionality in dropdown
    $(document).on('click', '.dropdown .clear-filter', function () {
        ele = $(this);
        ele.closest('.dropdown').find('.dropdown-item').removeClass('selected key-hover expand');
        ele.closest('.dropdown').find('.dropdown-item').attr('aria-selected', false);
        ele.closest('.dropdown').find('.dropdown-item input').prop('checked', false);
        ele.closest('.dropdown').find('.sub-menu input').removeClass('add');
        ele.closest('.dropdown').find('.sub-menu .item-count').hide();
        ele.closest('.dropdown').find('.form-control').removeAttr('aria-activedescendant');
        clearTagsAndText(ele, '.dropdown');
        return;
    });

    //Opening Dropdown on Click
    $(document).on('click', '.form-group:not(.readonly).dropdown:not(.auto-complete) .dropdown-heading', function () {
        ele = $(this);
        $('.dropdown').removeClass('show');
        ele.closest('.dropdown').addClass('show');
        ele.closest('.dropdown').find('.dropdown-menu').scrollTop(0);
        ele.closest('.dropdown').find('.form-control').removeAttr('readonly');
        ele.closest('.dropdown').find('.form-control').attr('aria-expanded', true);
        ele.closest('.dropdown').find('.form-control')[0].focus();
        if (ele.closest('.splitbutton').length) { //adding show class on split button to hide outline when dropdown is expanded
            ele.closest('.splitbutton').addClass('show');
        }
    });

    //Selecting Dropdown Item
    $(document).on('click', '.dropdown .dropdown-item:not(.all-check, .sub-menu, .search-item)', function () {
        ele = $(this);
        selectedDropdownItem = ele.find('a').text().trim();

        //Checking if the dropdown is multiselect type or not
        if (ele.closest('.dropdown').hasClass('dropdown-multiselect')) { //Multiselect Dropdown
            multiSelectedDropdown();
            allCheck(ele);
        } else if (ele.closest('.dropdown').hasClass('nested-dropdown')) { //Nested Dropdown
            if (ele.closest('.dropdown').hasClass('nested-multiselect')) {
                multiSelectedDropdown();
                selectedLength = ele.closest('.dropdown-menu').find('.dropdown-item.selected').length;
                if (selectedLength === 0) {
                    ele.closest('.sub-menu').find('.item-count').hide();
                } else {
                    ele.closest('.sub-menu').find('.item-count').show();
                    ele.closest('.sub-menu').find('.item-count').text("( " + selectedLength + " )");
                }
                ele = ele.closest('.dropdown-item.sub-menu');
                allCheck(ele);
            } else {
                singleSelectDropdown(ele);
                return false;
            }
        } else { //Normal Dropdown

            singleSelectDropdown(ele);
        }

        ele.closest('.dropdown').find('.dropdown-item').removeClass('hide');

    });

    // Single Select Dropdown Functionality
    function singleSelectDropdown(ele) {
        ele=ele;
        if(ele.find('.shortform').length > 0){
           selectedDropdownItem = ele.find('.shortform').text();
        }
        ele.closest('.form-group').find('.dropdown-heading .form-control').not('.splitbutton .form-control').val(selectedDropdownItem);
        ele.closest('.form-group').find('.dropdown-item').removeClass('selected key-hover');
        ele.closest('.sub-menu').removeClass('expand');
        ele.closest('.sub-menu').attr('aria-expanded', false);
        ele.addClass('selected key-hover');
        ele.closest('.form-group').find('.form-control')[0].focus();

        //If item has Image
        if (ele.find('img').length) {
            var imageSet = ele.find('img').attr('src');
            ele.closest('.dropdown').find('.dropdown-heading img').attr('src', imageSet);
            ele.closest('.dropdown').find('.dropdown-heading').addClass('show-image');
        }

        //If Input dropdown
        if (ele.closest('.input-dropdown').length) {
            ele.closest('.input-dropdown').find('.input .form-control').focus();
        }

        // Phone Number Check and also inserting country code of the selected dropdown item
        if (ele.closest('.input-dropdown-v2').hasClass('phone-number')) {
            const countrycode = selectedDropdownItem.slice(selectedDropdownItem.indexOf('+'));
            const countryshortform = selectedDropdownItem.trim().slice(0, 3);
            const countryname = ele.find('.country.name').text();
            ele.closest('.phone-number').find('.countrycode').html(countrycode);
            ele.closest('.dropdown').find('.dropdown-heading .form-control').not('.splitbutton .form-control').val(countryshortform);
            ele.closest('.dropdown').find('.dropdown-heading .form-control').not('.splitbutton .form-control').attr('title', countryname);
        }

        ele.closest('.dropdown').removeClass('show');

        //Profile Selection
        if(ele.closest('.profile-selection-wrapper').length){
           generateProfileSelection(ele, selectedDropdownItem);
        }
    }

    // Multi-Select Dropdown Functionality
    function multiSelectedDropdown() {
        ele.closest('.dropdown').addClass('show');
        if (!ele.hasClass('selected')) {
            ele.addClass('selected');
            ele.attr('aria-selected', true);
            ele.find('input').prop('checked', true); // Checking the checkbox
            multiSelectedItem = []; //Emptying the array

            //Looping through all the selected dropdown items and pushing value to the array
            //if nested multiselect, then adding group header name with options in the array (Option 1 | Option 1.1)
            $.each(ele.closest('.dropdown').find(".dropdown-item:not(.sub-menu).selected"), function () {
                if (ele.closest('.dropdown').hasClass('nested-multiselect')) {
                    const groupheader = $(this).closest('.dropdown-item.sub-menu').find('label').first().text().trim();
                    multiSelectedItem.push(groupheader + " | " + $(this).find('a').text().trim());
                } else {
                    multiSelectedItem.push($(this).find('a').text().trim());
                }
            });
        }
        //Unselect the selected items
        else {
            ele.removeClass('selected');
            ele.attr('aria-selected', false);
            ele.find('input').prop('checked', false); // Unchecking the checkbox
            var removeItem = ele.find('a').text().trim();

            //Removing from array
            multiSelectedItem = $.grep(multiSelectedItem, function (value) {
                // Removing single items from the nested-multiselect
                if (ele.closest('.dropdown').hasClass('nested-multiselect')) {
                    const slicedvalue = value.slice(value.indexOf('|') + 2);
                    return slicedvalue != removeItem; // If value after '|' matches it skips that value in the array
                } else {
                    return value != removeItem;
                }
            });
        }
        groupHeaderCheck(ele);

        //Emptying the tag wrapper
        ele.closest('.dropdown').find('.chip-wrapper').html('');

        //Creating the tag inside tagwrapper
        for (var i = 0; i < multiSelectedItem.length; i++) {
            ele.closest('.dropdown').find('.chip-wrapper').append('<div class="chip has-action" tabindex="0" title="' + multiSelectedItem[i] + '"><span class="text-value">' + multiSelectedItem[i] + '</span><i class="icon cancel-icon black-icon" title="close" aria-label="press delete to remove"></i></div>');
        }

        //hide or show Clear All button based on chips count
        spanCount = ele.closest('.dropdown').find('.chip-wrapper .chip.has-action').length;
        if (spanCount > 1) {
            ele.closest('.dropdown').find('.action-level-component').removeClass('hide');
        } else {
            ele.closest('.dropdown').find('.action-level-component').addClass('hide');
        }
    }

    //Nested Dropdown Item
    $(document).on('click', '.nested-dropdown .dropdown-item.sub-menu', function () {
        ele = $(this);
        if (ele.hasClass('expand')) {
            ele.addClass('expand');
            ele.attr('aria-expanded', true);
        } else {
            ele.closest('.dropdown').find('.dropdown-menu .dropdown-item').removeClass('expand');
            ele.closest('.dropdown').find('.dropdown-menu .dropdown-item.sub-menu').attr('aria-expanded', false);
            ele.addClass('expand');
            ele.attr('aria-expanded', true);
        }
        ele.closest('.dropdown').addClass('show');
    });

    //Tagwrapper action from multiselect dropdpown
    $(document).on('click', '.dropdown .chip.has-action .cancel-icon', function () {
        ele = $(this).closest('.chip.has-action');
        var removeItem = ele.text().trim('');
        //Removing from array
        multiSelectedItem = $.grep(multiSelectedItem, function (value) {
            return value != removeItem;
        });

        //  Unselecting the dropdown item
        ele.closest('.dropdown').find('.dropdown-item:not(.all-check)').each(function () {
            var ele = $(this);

            // Adding GroupHeader to dropDownitemText variable, to match removeItems => "Option 1 | Option 1.1"
            if (ele.closest('.dropdown').hasClass('nested-multiselect')) {
                sectionheader = ele.closest('.dropdown-item.sub-menu').find('label').first().text();
                var dropDownitemText = sectionheader + ' | ' + ele.find('label').first().text();

            } else {
                var dropDownitemText = ele.find('a').text();
            }
            if (dropDownitemText.trim() == removeItem) {
                ele.removeClass('selected');
                ele.attr('aria-selected', false);
                ele.find('input').prop('checked', false);

                if (ele.closest('.dropdown').hasClass('nested-multiselect')) {
                    groupHeaderCheck(ele);
                }
            }
        });

        allCheck(ele);
        ele.closest('.nested-multiselect').addClass('show');
        //Remove checkmark from All
        ele.closest('.dropdown').find('.dropdown-item.all-check').removeClass('selected');
        ele.closest('.dropdown').find('.dropdown-item.all-check').attr('aria-selected', false);
        ele.closest('.dropdown').find('.dropdown-item.all-check').find('input').prop('checked', false);
        //Decrease count
        $.each(ele.closest('.dropdown').find(".dropdown-item.sub-menu"), function () {
            selectedLength = $(this).find('.dropdown-menu .dropdown-item.selected').length;
            if (selectedLength === 0) {
                $(this).find('.item-count').hide();
            } else {
                $(this).find('.item-count').show();
                $(this).find('.item-count').text("( " + selectedLength + " )");
            }
        });
        //hide or show Clear All button based on chips count
        spanCount = ele.closest('.dropdown').find('.chip-wrapper .chip.has-action').length;
        if (spanCount > 2) {
            ele.closest('.dropdown').find('.action-level-component').removeClass('hide');
        } else {
            ele.closest('.dropdown').find('.action-level-component').addClass('hide');
        }
        ele.remove();
    });

    // Uncheckng & Checking All-Checkbox if any dropdown item is toggled
    function allCheck(ele) {
        totalItem = ele.closest('.dropdown-menu').find('.dropdown-item:not(.all-check)').length;
        totalSelectedItemCount = ele.closest('.dropdown-menu').find('.dropdown-item.selected:not(.all-check)').length;

        if (totalSelectedItemCount == totalItem) {
            ele.closest('.dropdown-menu').find('.dropdown-item.all-check').addClass('selected');
            ele.closest('.dropdown-menu').find('.dropdown-item.all-check').attr('aria-selected', true);
            ele.closest('.dropdown-menu').find('.dropdown-item.all-check').find('input').prop('checked', true);
        } else {
            ele.closest('.dropdown-menu').find('.dropdown-item.all-check').removeClass('selected');
            ele.closest('.dropdown-menu').find('.dropdown-item.all-check').attr('aria-selected', false);
            ele.closest('.dropdown-menu').find('.dropdown-item.all-check').find('input').prop('checked', false);
        }

    }

    // Check the number of selected item inside the submenu 
    function groupHeaderCheck(ele) {
        totalItems = ele.closest('.dropdown-item.sub-menu').find('.dropdown-item').length;
        totalSelectedItemCount = ele.closest('.dropdown-item.sub-menu').find('.dropdown-item.selected').length;

        if (totalSelectedItemCount == totalItems) {
            ele.closest('.dropdown-item.sub-menu').addClass('selected');
            ele.closest('.dropdown-item.sub-menu').attr('aria-selected', true);
            ele.closest('.dropdown-item.sub-menu').find('a input').addClass('add');
            ele.closest('.dropdown-item.sub-menu').find('a input').first().prop('checked', true);
        } else {
            ele.closest('.dropdown-item.sub-menu').removeClass('selected');
            ele.closest('.dropdown-item.sub-menu').attr('aria-selected', false);
            ele.closest('.dropdown-item.sub-menu').find('a input').removeClass('add');
            ele.closest('.dropdown-item.sub-menu').find('a input').first().prop('checked', false);
        }
    }

    // Nested Multi-Select Dropdown
    $(document).on('click', '.dropdown.nested-multiselect .dropdown-menu .sub-menu> a input', function () {
        var ele = $(this);
        ele.toggleClass('add');
        if (ele.hasClass('add')) {
            ele.closest('.dropdown-item.sub-menu').find('.dropdown-menu .dropdown-item').addClass('selected');
            ele.closest('.dropdown-item.sub-menu').find('.dropdown-menu .dropdown-item').attr('aria-selected', true);
            ele.closest('.dropdown-item.sub-menu').attr('aria-selected', true);
            itemId = ele.closest('.dropdown-item.sub-menu').attr('id');
            ele.closest('.dropdown').find('.form-control').first().attr('aria-activedescendant', itemId);
            ele.closest('.dropdown-item.sub-menu').find('.dropdown-menu .dropdown-item input').prop('checked', true);
            multiSelectedItem = []; //Emptying  the array

            //Looping through all the selected dropdown items and pushing value to the array
            $.each(ele.closest('.dropdown').find(".dropdown-item.selected:not(.all-check, .dropdown-item.sub-menu)"), function () {
                const groupheader = $(this).closest('.dropdown-item.sub-menu').find('label').first().text();
                multiSelectedItem.push(groupheader + " | " + $(this).find('a').text());
            });
            // console.log(multiSelectedItem);
        } else {
            ele.closest('.dropdown-item.sub-menu').find('.dropdown-menu .dropdown-item').removeClass('selected');
            ele.closest('.dropdown-item.sub-menu').find('.dropdown-menu .dropdown-item').attr('aria-selected', false);
            ele.closest('.dropdown-item.sub-menu').attr('aria-selected', false);
            ele.closest('.dropdown-item.sub-menu').find('.dropdown-menu .dropdown-item input').prop('checked', false);
            var removeItem = [];
            $.each(ele.closest('.dropdown-item.sub-menu').find(".dropdown-menu .dropdown-item"), function () {
                const groupheader = $(this).closest('.dropdown-item.sub-menu').find('label').first().text();
                removeItem.push(groupheader + " | " + $(this).find('a').text());
            });
            // Removing the unchecked one from the multiSelectedItem array
            multiSelectedItem = multiSelectedItem.filter(function (item) {
                return removeItem.indexOf(item) == -1;
            });

        }
        groupHeaderCheck(ele);
        //Item Count
        selectedLength = ele.closest('.sub-menu').find('.dropdown-menu .dropdown-item.selected').length;
        if (selectedLength === 0) {
            ele.closest('.sub-menu').find('.item-count').hide();
        } else {
            ele.closest('.sub-menu').find('.item-count').show();
            ele.closest('.sub-menu').find('.item-count').text("( " + selectedLength + " )");
        }
        //Emptying the tag wrapper
        ele.closest('.dropdown').find('.chip-wrapper').html('');

        //Creating the tag inside tagwrapper
        for (var i = 0; i < multiSelectedItem.length; i++) {
            ele.closest('.dropdown').find('.chip-wrapper').append('<div class="chip has-action" tabindex="0" title="' + multiSelectedItem[i] + '"><span class="text-value">' + multiSelectedItem[i] + '</span><i class="icon cancel-icon black-icon" title="close" aria-label="press delete to remove"></i></div>');
        }
        //hide or show Clear All button based on chips count
        spanCount = ele.closest('.dropdown').find('.chip-wrapper .chip.has-action').length;
        if (spanCount > 1) {
            ele.closest('.dropdown').find('.action-level-component').removeClass('hide');
        } else {
            ele.closest('.dropdown').find('.action-level-component').addClass('hide');
        }
        allCheck(ele);
    });

    //Key Functionality
    $(document).on('keydown', '.dropdown:not(.non-editable) .form-control', function(e){
        ele = $(this);
        if (e.keyCode === 9) { //tab functionality
            ele.closest('.dropdown').removeClass('show');
            $('.dropdown').find('.dropdown-item.sub-menu').attr('aria-expanded', false);
            ele.closest('.dropdown').find('.form-control:not(.ae-input-result-wrapper .form-control)').attr('aria-expanded', false);
            ele.removeAttr('aria-activedescendant');
            
            if ((ele.val().length) && (!(ele.closest('.dropdown').find('.dropdown-item.key-hover').length))) {
                if (ele.closest('.input-dropdown').hasClass('phone-number')) {
                    ele.closest('.input-dropdown').addClass('error');
                } else {
                    ele.closest('.dropdown').addClass('error');
                }
            } else {
                if(ele.closest('.dropdown').hasClass('dropdown-multiselect') || ele.closest('.dropdown').hasClass('nested-multiselect')) {
                    if(ele.val().length){
                        if(!ele.closest('.dropdown').find('.dropdown-item.key-hover').length){
                            ele.closest('.dropdown').addClass('error');
                        }
                    }
                }
            }
            if (((ele.closest('.dropdown').hasClass('dropdown-multiselect')) || (ele.closest('.dropdown').hasClass('nested-multiselect'))) && ((ele.closest('.dropdown').find('.dropdown-item.selected').length))) {
                // ele.val('');
            }
            ele.closest('.dropdown').find('.dropdown-item.key-hover').trigger('click');
            $('.dropdown').find('.dropdown-item').removeClass('expand');
            ele.closest('.dropdown').removeClass('show');
        }
    });
    

    // Autocomplete/Search Functionality 
    $('.dropdown:not(.non-editable):not(.splitbutton .dropdown) .form-control:not(.ae-global-search-wrapper .ae-input-section .form-control)').on('input', function (e) {
        ele = $(this);
        var itemId;
        var inputValue = ele.closest('.dropdown').find('.form-control').val().toLowerCase().trim(' ');
        var toltalItem = ele.closest('.dropdown').find('.dropdown-item').length;
        dropdownItem = ele.closest('.dropdown').find('.dropdown-item');
        ele.closest('.dropdown').find('.dropdown-item').removeClass('key-hover expand');
        ele.closest('.dropdown').find('.dropdown-item.sub-menu').attr('aria-expanded', false);
        ele.closest('.dropdown').find('.form-control').removeAttr('aria-activedescendant');
        ele.closest('.dropdown').find('.dropdown-heading').trigger('click');
        if (inputValue.length >= 2) {
            //Autocomplete/Search inside Nested Multiselect Dropdown
            if (ele.closest('.dropdown').hasClass('nested-dropdown')) {
                for (var i = 0; i < nestedDropdownItemArray.length; i++) {
                    if (nestedDropdownItemArray[i].nestedParent.trim().toLowerCase().indexOf(inputValue) > -1) {
                        // console.log('Matched', nestedDropdownItemArray[i].nestedParent, nestedDropdownItemArray[i].nestedParentIndex);
                        ele.closest('.dropdown').find('.dropdown-item.sub-menu:nth-child(' + nestedDropdownItemArray[i].nestedParentIndex + ')').addClass('key-hover');
                        itemId = ele.closest('.dropdown').find('.dropdown-item.sub-menu:nth-child(' + nestedDropdownItemArray[i].nestedParentIndex + ')').attr('id');
                        ele.closest('.dropdown').find('.form-control').first().attr('aria-activedescendant', itemId);
                        break;
                    } else if (nestedDropdownItemArray[i].nestedChild.trim().toLowerCase().indexOf(inputValue) > -1) {
                        ele.closest('.dropdown').find('.dropdown-item').removeClass('expand key-hover');
                        ele.closest('.dropdown').find('.dropdown-item.sub-menu').attr('aria-expanded', false);
                        ele.closest('.dropdown').find('.dropdown-item.sub-menu:nth-child(' + nestedDropdownItemArray[i].nestedParentIndex + ')').addClass('expand');
                        ele.closest('.dropdown').find('.dropdown-item.sub-menu:nth-child(' + nestedDropdownItemArray[i].nestedParentIndex + ')').attr('aria-expanded', true);
                        ele.closest('.dropdown').find('.dropdown-item.sub-menu:nth-child(' + nestedDropdownItemArray[i].nestedParentIndex + ')').find('.dropdown-item:nth-child(' + nestedDropdownItemArray[i].nestedChildIndex + ')').addClass('key-hover');
                        itemId = ele.closest('.dropdown').find('.dropdown-item.sub-menu:nth-child(' + nestedDropdownItemArray[i].nestedParentIndex + ')').find('.dropdown-item:nth-child(' + nestedDropdownItemArray[i].nestedChildIndex + ')').attr('id');
                        ele.closest('.dropdown').find('.form-control').first().attr('aria-activedescendant', itemId);
                        break;
                    }
                }

            } else { //Autocomplete/Search inside Normal dropdown
                match = 0;
                ele.closest('.dropdown').find('.dropdown-item').removeClass('hide');
                for (var i = 0; i <= toltalItem; i++) {
                    var eleText = ele.closest('.dropdown').find('.dropdown-item:nth-child(' + (i + 1) + ')').find('a').text().toLowerCase();
                    if (((eleText.trim()).indexOf(inputValue)) > -1) {
                        match += 1;
                        if (match == 1) {
                            ele.closest('.dropdown').find('.dropdown-item:nth-child(' + (i + 1) + ')').addClass('key-hover');
                            itemId = ele.closest('.dropdown').find('.dropdown-item:nth-child(' + (i + 1) + ')').attr('id');
                            ele.closest('.dropdown').find('.form-control').first().attr('aria-activedescendant', itemId);
                        }
                    } else {
                        ele.closest('.dropdown').find('.dropdown-item:nth-child(' + (i + 1) + ')').removeClass('key-hover');
                        ele.closest('.dropdown').find('.dropdown-item:nth-child(' + (i + 1) + ')').addClass('hide');
                    }
                }
                if (match == 0) { // Displaying all options if no match found
                    ele.closest('.dropdown').find('.dropdown-item').removeClass('hide keyhover');
                }
            }
            if (match > 0) {
                setTimeout(function () {
                    scrollDropdown(ele);
                }, 300);
            }
        } 
        else {
            if(inputValue.length<1 && ele.closest('.dropdown').find('.dropdown-heading img').length){
                ele.closest('.dropdown').find('.dropdown-heading img').attr('src', ' ');
                ele.closest('.dropdown').find('.dropdown-heading').removeClass('show-image');
            }
            ele.closest('.dropdown').find('.dropdown-item').removeClass('hide');
        }

    });
    
    $(document).on('keyup', '.dropdown:not(.non-editable):not(.disabled .dropdown) .form-control:not(.ae-global-search-wrapper .ae-input-section .form-control)', function(e){
            ele = $(this);
            eleVal=ele.val();
            var extremeMatchedItem, subDropdownItem, itemId;
            dropdownItem = ele.closest('.dropdown').find('.dropdown-item');
            totalItem = ele.closest('.dropdown').find('.dropdown-item').length;
            if (e.keyCode === 40) { //down arrow key
                e.preventDefault();
                ele.closest('.dropdown').find('.dropdown-heading').trigger('click'); //to expand dropdown
                ele = $(this); // ele changes in above click event so re-assigning
                if (dropdownItem.hasClass('key-hover')) {
                    hoveredIndex = ele.closest('.dropdown').find('.key-hover').index() + 1;
                    extremeMatchedItem = hoveredIndex; //keeping copy of position of item with key-hover 
                    if (ele.closest('.dropdown').hasClass('nested-dropdown')) { //Nested Dropdown
                        hoveredIndex++;
                        subDropdownItem = ele.closest('.dropdown').find('.expand .dropdown-item').length;
                        if (ele.closest('.dropdown').find('.all-check').hasClass('key-hover')) { // Nested Multiselect ALL checkbox
                            dropdownItem.removeClass('key-hover');
                            ele.closest('.dropdown').find('.sub-menu').removeClass('expand');
                            ele.closest('.dropdown').find('.sub-menu').attr('aria-expanded', false);
                            ele.closest('.dropdown').find('.sub-menu.dropdown-item:nth-child(' + hoveredIndex + ')').addClass('key-hover expand');
                            ele.closest('.dropdown').find('.sub-menu.dropdown-item:nth-child(' + hoveredIndex + ')').attr('aria-expanded', true);
                            itemId = ele.closest('.dropdown').find('.sub-menu.dropdown-item:nth-child(' + hoveredIndex + ')').attr('id');
                            ele.closest('.dropdown').find('.form-control').first().attr('aria-activedescendant', itemId);
                        } else if (ele.closest('.dropdown').find('.expand .dropdown-item').hasClass('key-hover')) {
                            dropdownItem.removeClass('key-hover');
                            if (subDropdownItem == extremeMatchedItem) { // To check last li or not
                                if (ele.closest('.dropdown').hasClass('nested-multiselect')) { // To expand submenu and add key-hover in particular li for select entire dropdown menu
                                    ele.closest('.dropdown').find('.expand').next('.sub-menu').addClass('expand key-hover');
                                    ele.closest('.dropdown').find('.expand').next('.sub-menu').attr('aria-expanded', true);
                                    itemId = ele.closest('.dropdown').find('.expand').next('.sub-menu').attr('id');
                                    ele.closest('.dropdown').find('.form-control').first().attr('aria-activedescendant', itemId);
                                    ele.closest('.dropdown').find('.expand').prev('.sub-menu').removeClass('expand');
                                    ele.closest('.dropdown').find('.expand').prev('.sub-menu').attr('aria-expanded', false);
                                } else { // To expand submenu and add key-hover in first li inside dropdown menu
                                    if (ele.closest('.dropdown').find('.expand').next('.sub-menu').length) { //checking if this sub-menu is last-child 
                                        ele.closest('.dropdown').find('.expand').next('.sub-menu').addClass('expand');
                                        ele.closest('.dropdown').find('.expand').next('.sub-menu').attr('aria-expanded', true);
                                        ele.closest('.dropdown').find('.expand').prev('.sub-menu').removeClass('expand');
                                        ele.closest('.dropdown').find('.expand').prev('.sub-menu').attr('aria-expanded', false);
                                        ele.closest('.dropdown').find('.expand .dropdown-item:first-child').addClass('key-hover');
                                        itemId = ele.closest('.dropdown').find('.expand .dropdown-item:first-child').attr('id');
                                        ele.closest('.dropdown').find('.form-control').first().attr('aria-activedescendant', itemId);
                                    } else {
                                        ele.closest('.dropdown').find('.expand .dropdown-item:last-child').addClass('key-hover');
                                        itemId = ele.closest('.dropdown').find('.expand .dropdown-item:last-child').attr('id');
                                        ele.closest('.dropdown').find('.form-control').first().attr('aria-activedescendant', itemId);
                                    }
                                }
                            } else {
                                ele.closest('.dropdown').find('.expand .dropdown-item:nth-child(' + hoveredIndex + ')').addClass('key-hover');
                                itemId = ele.closest('.dropdown').find('.expand .dropdown-item:nth-child(' + hoveredIndex + ')').attr('id');
                                ele.closest('.dropdown').find('.form-control').first().attr('aria-activedescendant', itemId);
                            }
                        } else if (ele.closest('.dropdown').find('.expand').hasClass('key-hover')) { // If key hover class in submenu
                            dropdownItem.removeClass('key-hover');
                            ele.closest('.dropdown').find('.expand .dropdown-item:first-child').addClass('key-hover');
                            itemId = ele.closest('.dropdown').find('.expand .dropdown-item:first-child').attr('id');
                            ele.closest('.dropdown').find('.form-control').first().attr('aria-activedescendant', itemId);
                        }
                    } else { //Normal Dropdown
                        if (hoveredIndex < totalItem) {
                            //Incrementing hoveredIndex to find position of next unhidden dropdown-item
                            //Loop will break when unhidden dropdown-item is found or when hoveredIndex = totalItem
                            do {
                                hoveredIndex += 1;
                            } while (ele.closest('.dropdown').find('.dropdown-item:nth-child(' + hoveredIndex + ')').hasClass('hide') && hoveredIndex < totalItem);
    
                            if (!(hoveredIndex == totalItem) || !(ele.closest('.dropdown').find('.dropdown-item:last-child').hasClass('hide'))) {
                                dropdownItem.removeClass('key-hover');
                                ele.closest('.dropdown').find('.dropdown-item:nth-child(' + hoveredIndex + ')').addClass('key-hover');
                                itemId = ele.closest('.dropdown').find('.dropdown-item:nth-child(' + hoveredIndex + ')').attr('id');
                                ele.closest('.dropdown').find('.form-control').first().attr('aria-activedescendant', itemId);
                            }
                        }
                    }
                } else {
                    ele.closest('.dropdown').find('.dropdown-item:first-child:not(.sub-dropdown-item)').addClass('key-hover');
                    itemId = ele.closest('.dropdown').find('.dropdown-item:first-child:not(.sub-dropdown-item)').attr('id');
                    ele.closest('.dropdown').find('.form-control').first().attr('aria-activedescendant', itemId);
                    if (ele.closest('.dropdown').find('.dropdown-item:first-child').hasClass('sub-menu')) { //if nested single select first li
                        ele.closest('.dropdown').find('.key-hover').addClass('expand');
                        ele.closest('.dropdown').find('.key-hover').addClass('aria-expanded', true);
                        dropdownItem.removeClass('key-hover');
                        ele.closest('.dropdown').find('.expand .dropdown-item:first-child').addClass('key-hover');
                        itemId = ele.closest('.dropdown').find('.expand .dropdown-item:first-child').attr('id');
                        ele.closest('.dropdown').find('.form-control').first().attr('aria-activedescendant', itemId);
                    }
                }
                scrollDropdown(ele);
                return;
            } else if (e.keyCode === 38) { //up arrow key
                e.preventDefault();
                ele.closest('.dropdown').find('.dropdown-heading').trigger('click');
                ele = $(this); // ele changes in above click event so re-assigning
    
                if (dropdownItem.hasClass('key-hover')) {
                    hoveredIndex = ele.closest('.dropdown').find('.key-hover').index() + 1;
                    extremeMatchedItem = hoveredIndex; //keeping copy of position of item with key-hover
                    if (ele.closest('.dropdown').hasClass('nested-dropdown')) { //Nested Dropdown
                        if (ele.closest('.dropdown').find('.expand .dropdown-item').hasClass('key-hover')) {
                            dropdownItem.removeClass('key-hover');
                            hoveredIndex--;
                            if (hoveredIndex == 0) {
                                if (ele.closest('.dropdown').hasClass('nested-multiselect')) { //nested multiselect - If keyhover comes to sub menu
                                    ele.closest('.dropdown').find('.expand').addClass('key-hover');
                                    itemId = ele.closest('.dropdown').find('.expand').attr('id');
                                    ele.closest('.dropdown').find('.form-control').first().attr('aria-activedescendant', itemId);
                                } else { // To expand submenu and add key-hover in last li inside dropdown menu
                                    if (ele.closest('.dropdown').find('.expand').prev('.sub-menu').length) { //checking if this sub-menu is first-child 
                                        ele.closest('.dropdown').find('.expand').prev('.sub-menu').addClass('expand');
                                        ele.closest('.dropdown').find('.expand').prev('.sub-menu').attr('aria-expanded', true);
                                        ele.closest('.dropdown').find('.expand').next('.sub-menu').removeClass('expand key-hover');
                                        ele.closest('.dropdown').find('.expand').next('.sub-menu').attr('aria-expanded', false);
                                        ele.closest('.dropdown').find('.expand .dropdown-item:last-child').addClass('key-hover');
                                        itemId = ele.closest('.dropdown').find('.expand .dropdown-item:last-child').attr('id');
                                        ele.closest('.dropdown').find('.form-control').first().attr('aria-activedescendant', itemId);
                                    } else {
                                        ele.closest('.dropdown').find('.expand .dropdown-item:first-child').addClass('key-hover');
                                        itemId = ele.closest('.dropdown').find('.expand .dropdown-item:first-child').attr('id');
                                        ele.closest('.dropdown').find('.form-control').first().attr('aria-activedescendant', itemId);
                                    }
                                }
                            } else {
                                ele.closest('.dropdown').find('.expand .dropdown-item:nth-child(' + hoveredIndex + ')').addClass('key-hover');
                                itemId = ele.closest('.dropdown').find('.expand .dropdown-item:nth-child(' + hoveredIndex + ')').attr('id');
                                ele.closest('.dropdown').find('.form-control').first().attr('aria-activedescendant', itemId);
                            }
                        } else if (ele.closest('.dropdown').find('.expand').hasClass('key-hover')) {
                            if ($(".key-hover").prev('.dropdown-item').hasClass('all-check')) {
                                dropdownItem.removeClass('key-hover');
                                ele.closest('.dropdown').find('.dropdown-item.all-check').addClass('key-hover');
                                itemId = ele.closest('.dropdown').find('.dropdown-item.all-check').attr('id');
                                ele.closest('.dropdown').find('.form-control').first().attr('aria-activedescendant', itemId);
                                ele.closest('.dropdown').find('.expand').next('.sub-menu').removeClass('expand');
                                ele.closest('.dropdown').find('.expand').next('.sub-menu').attr('aria-expanded', false);
                            } else {
                                ele.closest('.dropdown').find('.expand').prev('.sub-menu').addClass('expand');
                                ele.closest('.dropdown').find('.expand').prev('.sub-menu').attr('aria-expanded', true);
                                ele.closest('.dropdown').find('.expand').next('.sub-menu').removeClass('expand key-hover');
                                ele.closest('.dropdown').find('.expand').next('.sub-menu').attr('aria-expanded', false);
                                ele.closest('.dropdown').find('.expand .dropdown-item:last-child').addClass('key-hover');
                                itemId = ele.closest('.dropdown').find('.expand .dropdown-item:last-child').attr('id');
                                ele.closest('.dropdown').find('.form-control').first().attr('aria-activedescendant', itemId);
                            }
                        }
                    } else { //Normal Dropdown
                        if (hoveredIndex > 1) {
                            //Decrementing hoveredIndex to find position of unhidden dropdown-item
                            //Loop will break when unhidden dropdown-item is found or when hoveredIndex = 1
                            do {
                                hoveredIndex -= 1;
                            } while (ele.closest('.dropdown').find('.dropdown-item:nth-child(' + hoveredIndex + ')').hasClass('hide') && hoveredIndex > 1);
    
                            if (!(hoveredIndex == 1) || !(ele.closest('.dropdown').find('.dropdown-item:first-child').hasClass('hide'))) {
                                dropdownItem.removeClass('key-hover');
                                ele.closest('.dropdown').find('.dropdown-item:nth-child(' + hoveredIndex + ')').addClass('key-hover');
                                itemId = ele.closest('.dropdown').find('.dropdown-item:nth-child(' + hoveredIndex + ')').attr('id');
                                ele.closest('.dropdown').find('.form-control').first().attr('aria-activedescendant', itemId);
                            }
                        }
                    }
                } else {
                    ele.closest('.dropdown').find('.dropdown-item:last-child:not(.sub-dropdown-item)').addClass('key-hover');
                    itemId = ele.closest('.dropdown').find('.dropdown-item:last-child:not(.sub-dropdown-item)').attr('id');
                    ele.closest('.dropdown').find('.form-control').first().attr('aria-activedescendant', itemId);
                    if (ele.closest('.dropdown').find('.dropdown-item:last-child').hasClass('sub-menu')) {
                        ele.closest('.dropdown').find('.key-hover').addClass('expand');
                        ele.closest('.dropdown').find('.key-hover').attr('aria-expanded', true);
                        dropdownItem.removeClass('key-hover');
                        ele.closest('.dropdown').find('.expand .dropdown-item:last-child').addClass('key-hover');
                        itemId = ele.closest('.dropdown').find('.expand .dropdown-item:last-child').attr('id');
                        ele.closest('.dropdown').find('.form-control').first().attr('aria-activedescendant', itemId);
                    }
                }
                scrollDropdown(ele);
                return;
            } else if (e.keyCode === 27) { // esc functionality
                ele.closest('.dropdown').removeClass('show');
                $('.dropdown').find('.dropdown-item').removeClass('key-hover expand');
                $('.dropdown').find('.dropdown-item.sub-menu').attr('aria-expanded', false);
                ele.closest('.dropdown').find('.form-control').attr('aria-expanded', false);
                ele.closest('.dropdown').find('.form-control').removeAttr('aria-activedescendant');
            } else if (e.keyCode === 13) { //enter
                e.preventDefault();
                if (ele.closest('.splitbutton').length && !(ele.closest('.splitbutton').find('.key-hover').length)) {
                    return;
                }
                if (ele.closest('.input-dropdown-v2').find('.key-hover').length) {
                    ele.closest('.input-dropdown-v2').find('.input .form-control').focus(); //in input-dropdown-v2, after selecting an item moving focus to input form-control 
                }
                ele.closest('.dropdown').find('.dropdown-heading').trigger('click');
                ele = $(this); // ele changes in above click event so re-assigning
                if (ele.closest('.dropdown').find('.key-hover').hasClass('sub-menu')) { // if keyhover on nested multi sele.closest('.dropdown')ct submenu - To sele.closest('.dropdown')ct entire dropdown item inside
                    if (ele.closest('.dropdown').closest('.nested-multiselect').length) {
                        ele.closest('.dropdown').find('.key-hover> a input').trigger('click');
                        ele = $(this);
                    } else {
                        ele.closest('.dropdown').find('.key-hover.sub-menu').trigger('click');
                        ele = $(this);
                    }
                } else {
                    $('.dropdown-item.key-hover').trigger('click');
                    ele = $(this);
                    ele.closest('.dropdown').find('.dropdown-item').removeClass('hide');
                    if (!(ele.closest('.dropdown-multiselect').length || ele.closest('.nested-multiselect').length)) {
                        // ele.closest('.dropdown').find('.dropdown-item:not(".sub-menu")').removeClass('key-hover');
                    }
                }
                if (!ele.closest('.dropdown').hasClass('show')) { // in single select dropdown, dropdown will be collapsed after selecting dropdown-item by pressing enter
                    ele.closest('.dropdown').find('.form-control').attr('aria-expanded', false);
                    ele.closest('.dropdown').find('.form-control').removeAttr('aria-activedescendant');
                }
                return;
            }
            if(eleVal.length<1){
                ele.closest('.form-group').find('.dropdown-item').removeClass('selected');
            }
    });

    $(document).on('focus', '.dropdown:not(.readonly) .dropdown-heading .form-control', function () {
        $(this).closest('.dropdown').removeClass('error');
        $(this).closest('.dropdown').addClass('show');
        $(this).closest('.dropdown .dropdown-heading').trigger('click');
        $(this).closest('.dropdown .dropdown-heading').removeClass('show-image');
    });

    //Multi-Select Dropdown All-Check Functionality
    $(document).on('click', '.all-check', function () {
        var ele = $(this);
        if (!ele.hasClass('selected')) {
            multiSelectedItem = []; //Emptying  the array
            //Emptying the tag wrapper
            ele.closest('.dropdown').find('.chip-wrapper').html('');
            ele.closest('.dropdown-menu').find('.dropdown-item').addClass('selected');
            ele.closest('.dropdown-menu').find('.dropdown-item').attr('aria-selected', true);
            ele.closest('.dropdown-menu').find('.dropdown-item input').prop('checked', true);
            ele.closest('.dropdown-menu').find('.dropdown-item.sub-menu input').addClass('add');

            //Looping through all the selected dropdown items and pushing value to the array
            //if nested multiselect, then adding group header name with options (Option 1 | Option 1.1)
            $.each(ele.closest('.dropdown').find(".dropdown-item.selected:not(.all-check, .dropdown-item.sub-menu)"), function () {
                // multiSelectedItem.push($(this).find('a').text());
                if (ele.closest('.dropdown').hasClass('nested-multiselect')) {
                    const groupheader = $(this).closest('.dropdown-item.sub-menu').find('label').first().text();
                    multiSelectedItem.push(groupheader + " | " + $(this).find('a').text().trim());
                } else {
                    multiSelectedItem.push($(this).find('a').text().trim());
                }

                //Increase Item Count
                ele.closest('.dropdown-menu').find('.dropdown-item.sub-menu .item-count').show();
                $.each(ele.closest('.dropdown').find(".dropdown-item.sub-menu"), function () {
                    selectedLength = $(this).find('.dropdown-menu .dropdown-item').length;
                    $(this).find('.item-count').text("( " + selectedLength + " )");
                });
            });

        } else {
            ele.closest('.dropdown-menu').find('.dropdown-item').removeClass('selected');
            ele.closest('.dropdown-menu').find('.dropdown-item').attr('aria-selected', false);
            ele.closest('.dropdown-menu').find('.dropdown-item input').prop('checked', false);
            ele.closest('.dropdown-menu').find('.dropdown-item.sub-menu input').removeClass('add');
            ele.closest('.dropdown-menu').find('.dropdown-item.sub-menu .item-count').hide();
            multiSelectedItem = []; //Emptying  the array

            //Emptying the tag wrapper
            ele.closest('.dropdown').find('.chip-wrapper').html('');
        }
        allCheck(ele);

        //Creating the tag inside tagwrapper
        for (var i = 0; i < multiSelectedItem.length; i++) {
            ele.closest('.dropdown').find('.chip-wrapper').append('<div class="chip has-action" tabindex="0" title="' + multiSelectedItem[i] + '"><span class="text-value">' + multiSelectedItem[i] + '</span><i class="icon cancel-icon black-icon" title="close" aria-label="press delete to remove"></i></div>');
        }

        //hide or show Clear All button based on chips count
        spanCount = ele.closest('.dropdown').find('.chip-wrapper .chip.has-action').length;
        if (spanCount > 1) {
            ele.closest('.dropdown').find('.action-level-component').removeClass('hide');
        } else {
            ele.closest('.dropdown').find('.action-level-component').addClass('hide');
        }
    });

    //Fousing the nested multiselect dropdown
    $(document).on('focus', '.nested-dropdown .dropdown-heading .form-control', function () {
        var ele = $(this);
        nestedMultiSelectArray(ele);
    });

    //Fousing out from the nested multiselect dropdown an emptying the nestedDropdownItemArray
    $(document).on('focusout', '.nested-dropdown .dropdown-heading .form-control', function () {
        nestedDropdownItemArray = [];
    });

    //On focus of Nested Multi Select Dropdown creating an array with all the dropdown items for autoselect functionality
    var nestedDropdownItemArray = [];

    function nestedMultiSelectArray(ele) {
        var nestedParent, nestedParentIndex, nestedChild, nestedChildIndex;
        ele.closest('.dropdown').find('.dropdown-item:not(.all-check)').each(function () {
            if (ele.closest('.dropdown').hasClass('nested-multiselect')) { //Creating the array if the dropdown is Nested Multi Select
                if ($(this).hasClass('sub-menu')) {
                    nestedParent = $(this).find('label').first().text().toLowerCase().trim();
                    nestedParentIndex = $(this).index() + 1;
                    $(this).find('.dropdown-item').each(function () {
                        nestedChild = $(this).find('label').first().text().toLowerCase().trim();
                        nestedChildIndex = $(this).index() + 1;
                        nestedDropdownItemArray.push({
                            "nestedParent": nestedParent,
                            "nestedParentIndex": nestedParentIndex,
                            "nestedChild": nestedChild,
                            "nestedChildIndex": nestedChildIndex
                        });
                    });
                }
            } else {
                if ($(this).hasClass('sub-menu')) { //Creating the array if the dropdown is Nested  Single Select
                    nestedParent = $(this).find('a').first().text().toLowerCase().trim();
                    nestedParentIndex = $(this).index() + 1;
                    $(this).find('.dropdown-item').each(function () {
                        nestedChild = $(this).find('a').first().text().toLowerCase().trim();
                        nestedChildIndex = $(this).index() + 1;
                        nestedDropdownItemArray.push({
                            "nestedParent": nestedParent,
                            "nestedParentIndex": nestedParentIndex,
                            "nestedChild": nestedChild,
                            "nestedChildIndex": nestedChildIndex
                        });
                    });
                }
            }

        });
    }
}
//END:Dropdown

 //Auto Scroll to the hovered position
 function scrollDropdown(ele) {
    var ele = ele;
    if (ele.closest('.form-group').find('.key-hover').length) {
        ele.closest('.form-group').find('.dropdown-menu').scrollTop(0); //set to top
        currentKeyPosition = ele.closest('.form-group').find('.key-hover').position().top;
        ele.closest('.form-group').find('.dropdown-menu').animate({
            scrollTop: currentKeyPosition
        }, 10);
    }
}

// START: Auto Suggest
function autoSuggest(){
    var ele, inputValue, toltalItem, itemId, match=0, showedItemIndex;
    $('.form-group[type=autosuggest] .dropdown-item').removeClass('show');
    $('.form-group[type=autosuggest] .form-control').on('keydown', function(e){
       ele=$(this);
       inputValue=ele.val().toLowerCase();
       toltalItem=ele.closest('.form-group').find('.dropdown-item:not(.empty)').length;
       ele.closest('.form-group').find('.dropdown-item').removeClass('selected');
       if(e.keyCode!=13 && e.keyCode!=27 && e.keyCode!=38 && e.keyCode!=40){
            if(inputValue.length >=2){
                for (var i = 1; i <= toltalItem; i++) {
                    var eleText = ele.closest('.form-group').find('.dropdown-item:nth-child(' + (i + 1) + ')').find('a').text().toLowerCase();
                    if (((eleText.trim()).indexOf(inputValue)) > -1) {
                        match += 1;
                        ele.closest('.form-group').find('.dropdown-item:first-child').removeClass('show');
                        if (match > 0) {
                            ele.closest('.form-group').addClass('show');
                            ele.closest('.form-group').find('.dropdown-item:nth-child(' + (i + 1) + ')').addClass('show');
                            ele.closest('.form-group').find('.dropdown-item.show').first().addClass('key-hover');
                            itemId = ele.closest('.form-group').find('.dropdown-item:nth-child(' + (i + 1) + ')').attr('id');
                            ele.attr('aria-activedescendant', itemId);
                        }
                        else{
                            match=0;
                        }
                    }
                }
                if (match==0){
                    ele.closest('.form-group').find('.dropdown-item').removeClass('show').removeClass('key-hover');
                    ele.closest('.form-group').addClass('show').find('.dropdown-item:first-child').addClass('show');
                }
            }
            if (inputValue.length<2){
                ele.closest('.form-group').find('.dropdown-item').removeClass('show').removeClass('key-hover');
                ele.closest('.form-group').find('.dropdown-item:first-child').addClass('show');
                match=0;
            }
            if(inputValue.length==1){
                ele.closest('.form-group').removeClass('show');
                ele.closest('.form-group').find('.dropdown-item').removeClass('show');
            }
        }

        if (e.keyCode === 13) { //enter
            ele.closest('.form-group[type=autosuggest]').find('.dropdown-item.key-hover').trigger('click'); 
        }
        if (e.keyCode === 27) { //esc
            e.preventDefault();
            ele.attr('aria-expanded', false);
        }
    
        if (e.keyCode === 40) { //Down and Right(for QuickLinks)
            e.preventDefault();
            showedItemIndex=ele.closest('.form-group').find('.dropdown-item.key-hover').index()+1;
            ele.closest('.form-group').find('.dropdown-item').removeClass('key-hover');
            ele.closest('.form-group').find('.dropdown-item:nth-child('+(showedItemIndex + 1)+')').addClass('key-hover');
            scrollDropdown(ele);
    
        } 
        if(e.keyCode== 9){ //Tab
            ele.closest('.form-group').removeClass('show');
            ele.closest('.form-group').find('.dropdown-item').removeClass('show');
            if(!ele.closest('.form-group').find('.dropdown-item.key-hover').length){
                ele.closest('.form-group').addClass('error');
            }
        }else if (e.keyCode === 38) { //Up And Left(for QuickLinks)
            e.preventDefault();
            showedItemIndex=ele.closest('.form-group').find('.dropdown-item.key-hover').index()+1;
            ele.closest('.form-group').find('.dropdown-item').removeClass('key-hover');
            ele.closest('.form-group').find('.dropdown-item:nth-child('+(showedItemIndex - 1)+')').addClass('key-hover');
            scrollDropdown(ele);
        }

    });

   
    $(document).on('click', '.form-group[type=autosuggest] .dropdown-item', function(){
        var ele=$(this);
        ele.closest('.form-group').find('.form-control')[0].focus();
        var eleVal=ele.find('a').html();
        ele.closest('.form-group').find('.dropdown-item').removeClass('selected key-hover');
        ele.addClass('selected key-hover');
       
        $(this).closest('.form-group').find('.form-control').val(eleVal);
        ele.closest('.form-group').removeClass('show');
    });
    // $(document).on('focusout', '.form-group[type=autosuggest] .form-control', function(){
    //     // ele.closest('.form-group').removeClass('show');
    //     ele.closest('.form-group').find('.dropdown-item').removeClass('show');
    //     if(!ele.closest('.form-group').find('.dropdow-item.selected').length){
    //         ele.closest('.form-group').addClass('error');
    //     }
    // });

}
// END: Auto Suggest


//START: Tab
function tab() {
    var ele, eleIndex;
    $(document).on('click', '.tab-wrapper .ae-nav-item:not(.disabled)', function () {
        ele = $(this);
        eleIndex = ele.index() + 1;
        ele.closest('.tab-wrapper').find('.ae-nav-item').removeClass('selected');
        ele.closest('.tab-wrapper').find('.tab-item').removeClass('selected');

        ele.addClass('selected');
        ele.closest('.tab-wrapper').find('.tab-item:nth-child(' + eleIndex + ')').addClass('selected');
    });
    //NOTE: Accessing through keyboard. If the last form element inside ae-nav-item, the focus moves to the last unselected ae-nav-tab. 
    $(document).on('focusout', '.ae-nav-item.selected  .ae-form-group-wrapper:last-child .form-group:last-child', function () {
        ele = $(this);
        var count = 0;
        ele.closest('.ae-nav-wrapper').find('.ae-nav-tab').each(function () {
            if (!($(this).hasClass('success'))) {
                count += 1;
            }
        });
        if (count != 0) {
            ele.closest('.ae-nav-wrapper').find('.ae-nav-tab:not(.selected):not(.success):first').focus().trigger('click');
        }
    });

    //NOTE: Shortcut key to go back to the ae-nav-tab from the ae-nav-item. 
    $(document).on('keydown', '.ae-nav-wrapper .ae-nav-item.selected', function (e) {
        ele = $(this);
        if (e.ctrlKey && e.keyCode === 38) { //CTRL+UP Arrow
            ele.closest('.ae-nav-wrapper').find('.ae-nav-tab.selected').focus();
        }

    });
}
//END: Tab

//START: Tree list
function treeList() {
    var ele;
    $(document).on('click', '.tree-list .list-content.header', function () {
        ele = $(this);
        ele.closest('.sub-list').toggleClass('expand');
        if (ele.closest('.sub-list').hasClass('expand')) {
            ele.closest('.sub-list').attr('aria-expanded', true);
        } else {
            ele.closest('.sub-list').attr('aria-expanded', false);
        }
    });
    $(document).on('click','.tree-list .list-content:not(.header)',function(){
        ele=$(this);
        ele.closest('.tree-list').find('.list-group-item').removeClass('selected');
        ele.closest('.list-group-item').addClass('selected');
       

    });


    $(document).on('keydown', '.list-group-item[role="treeitem"]', function (e) {
        var ele, currentTreeItem, siblingTreeItem;
        ele = $(this);
        e.stopPropagation();
        currentTreeItem = ele.index() + 1; // Gets position of current treeitem
        siblingTreeItem = ele.closest('.list-group').children('.list-group-item').length; //Total sibling treeitems

        if (e.keyCode === 40) { //Down Arrow
            e.preventDefault();
            currentTreeItem = currentTreeItem + 1;
            if (ele.hasClass('expand') || ele.hasClass('sub-menu')) { // if the treeitem is expanded, its first-child should get focus
                ele.find('.list-group-item').first().focus();
            } else if (siblingTreeItem < currentTreeItem) {
                currentTreeItem = ele.closest('.list-group').parent('.list-group-item').index() + 1;
                siblingTreeItem = ele.closest('.list-group').parent('.list-group-item').closest('.list-group').children('.list-group-item').length;
                ele.closest('.list-group').parent('.list-group-item').focus();
                while (currentTreeItem == siblingTreeItem || !ele.closest('.list-group[role="tree"]').children(':focus')) {
                    currentTreeItem = ele.closest('.list-group[role="tree"]').find('.list-group-item:focus').closest('.list-group').parent('.list-group-item').index() + 1;
                    siblingTreeItem = ele.closest('.list-group[role="tree"]').find('.list-group-item:focus').closest('.list-group').children('.list-group-item').length;
                    ele.closest('.list-group[role="tree"]').find('.list-group-item:focus').closest('.list-group').parent('.list-group-item').focus();
                }
                if (ele.closest('.list-group[role="tree"]').children(':last-child:focus').length) {
                    ele.focus();
                } else {
                    ele.closest('.list-group[role="tree"]').find('.list-group-item:focus').next().focus();
                }
            } else {
                ele.closest('.list-group').children('.list-group-item:nth-child(' + currentTreeItem + ')').focus();
            }
        }

        if (e.keyCode === 38) { // Up Arrow
            e.preventDefault();
            currentTreeItem = currentTreeItem - 1;
            if (currentTreeItem < 1) { // if it is a first item, focus moves to parent
                ele.closest('.list-group').parent('.list-group-item').focus();
            } else {
                ele.prev().focus();
                if (ele.prev().hasClass('expand') || ele.prev().hasClass('sub-menu')) { //focus moves to last item in prev if it is expanded
                    ele.prev().find('.list-group-item').focus();
                }
            }
        } else if (e.keyCode === 13) { //Enter Key
            // e.preventDefault();
            ele.children('.tree-list .list-content').trigger('click');
        }
    });
}
//END: Tree list

//START: Navigate with Nav
function navigateWithNav() {
    var ele, eleIndex;
    $(document).on('click', '.ae-nav-tabs .ae-nav-tab:not(.disabled):not(.has-sub-list)', function () {
        ele = $(this);
        
        if(ele.closest('.has-sub-list').length){
           eleIndex= (ele.closest('.has-sub-list').index()+1)+(ele.closest('.sub-nav').index()+1)+ (ele.index()+1);
        }
        else{
            eleIndex = ele.index() + 1;
        }

       
        console.log('Clicked Index- ',eleIndex);

        ele.closest('.ae-nav-tabs').find('.ae-nav-tab').removeClass('selected active').attr({
            'tabindex': '-1',
            'aria-selected': false,
        });
        ele.closest('.ae-nav-wrapper').find('.ae-nav-item-wrapper .ae-nav-item').removeClass('selected active').attr({
            'tabindex': '-1',
            'aria-selected': false,
        });

        //Logoc for sub menu list
        if (ele.closest('.ae-nav-tab').find('.ae-nav-tabs').length) {
            ele.closest('.ae-nav-tab').find('.ae-nav-tabs .ae-nav-tab').removeClass('selected active').attr({
                'tabindex': '-1',
                'aria-selected': false,
            });
        }

        ele.addClass('selected active').attr({
            'tabindex': '0',
            'aria-selected': true,
        });
        //Only for Profile Application slection usecase
        if(ele.closest('.profile-application-selection-wrapper').length){
            $('.profile-application-selection-wrapper .empty-state').hide();
            
            $('.profile-application-selection-wrapper .ae-card').addClass('card-has-ft');
            $('.profile-application-selection-wrapper .ae-card .col-12.ft').removeClass('hide');

        }
        
        ele.closest('.ae-nav-wrapper').find('.ae-nav-item-wrapper .ae-nav-item:nth-child(' + eleIndex + ')').addClass('selected active').attr({
            'tabindex': '0',
            'aria-selected': true,
        });

        if (ele.closest('.ae-nav-wrapper').find('.ae-nav-item.selected.active .ae-nav-wrapper').length) {
            innerNavTabIndex = ele.closest('.ae-nav-wrapper').find('.ae-nav-item.selected.active .ae-nav-tab.selected.active').index() + 1;
            ele.closest('.ae-nav-wrapper').find('.ae-nav-item.selected.active .ae-nav-item:nth-child(' + innerNavTabIndex + ')').addClass('selected active').attr({
                'tabindex': '0',
                'aria-selected': true,
            });
        }
    });
}
//END: Navigate with Nav

//START: Toggle Switch
function toggleSwitcher() {
    $(document).on('click', '.toggle-switch', function () {
        var ele = $(this);
        toggleCheck = ele.hasClass('readonly');
        if(toggleCheck) return false;
        ele.closest('.toggle-wrapper').toggleClass('on');
    });
}
//END: Toggle Switch


//START: Show Modal

function showModal(modal, ele) {
    $('.ae-modal').removeClass('show');
    $(modal).addClass('show');

    //Adding opened-popup class to the element that has opened the popup
    $('*').removeClass('opened-popup');
    $(ele).addClass('opened-popup');

    if (!$(modal).hasClass('floater')) {
        $('.bg-overlay').addClass('show');
    } else {
        $(modal).draggable({
            containment: "window",
            handle: ".modal-header"
        });
        $('.ae-modal').removeClass('modal-minimize');
        $('.modal-title').removeClass('maximize');
    }
    dragModal();
}
//END: Modal

// START: Dragging Functionality
function dragModal() {
    var ele, modalTop, modalLeft;
    $(document).on('mousedown', '.floater .modal-header', function () {
        ele = $(this);
        ele.closest('.ax-modal').draggable({
            containment: "window",
            handle: ".modal-header"
        });
        modalTop = ele.closest('.floater').position().top;
        modalLeft = ele.closest('.floater').offset().left;
        ele.closest('.floater').css({
            "top": modalTop,
            "left": modalLeft
        });;
        ele.closest('.floater').addClass('draggable');
    });
}
// END: Dragging Functionality

//START: Show Notification
function showNotification(ele, eleHeading, eleText) {
    $('.ae-notification:not(.no-hide)').removeClass('show');
    $(ele).addClass('show');
    setTimeout(function () {
        $(ele).focus();
    }, 500);

    if (eleHeading != undefined) {
        $(ele).find('.notification-content h5').text(eleHeading);
    }
    if (eleText != undefined) {
        $(ele).find('.notification-content p').text(eleText);
    } else {
        $(ele).find('.notification-content p').text('Notification text comes here');
    }
    if ($(ele).hasClass('ae-auto-close-notification')) {
        setTimeout(function () {
            $(ele).removeClass('show');
        }, 5000);
    }

}
//END: Show Notification

//START: Close Notification
function closeNotification() {
    $('.ae-notification:not(.no-hide)').removeClass('show');
}
//END: Close Notification

//START: Close Modal
function closeModal() {
    $('.ae-modal, .bg-overlay').removeClass('show');
    $(".floater").css({
        "top": "",
        "left": "",
        "width": ""
    });
    $('.floater').removeClass('draggable');

    $('.opened-popup').focus();
    $('*').removeClass('opened-popup');
}
//END: Close Modal

//START: Show Error
function showError(errorText) {
    $('.alert-warning .alert-msg').html(errorText);
    $('.alert-warning').addClass('show');
}
//END: Show Error

//START: Close Error
function hideError(errorText) {
    $('.alert-warning .alert-msg').html('');
    $('.alert-warning').removeClass('show');
}
//END: Close Error

//START: Show Loader
function showLoader() {
    $('.bg-overlay, .loader-wrapper').addClass('show');
}
//END: Show Loader

//START: Hide Loader
function hideLoader() {
    if (!$('.ae-modal').hasClass('show')) {
        $('.bg-overlay').removeClass('show');
    }

    $('.loader-wrapper').removeClass('show');

}
//END: Hide Loader

//START: Site Navigation Menu functions on tablet view
function siteNavCollapseBtn() {
    $(document).on('click', '.site-navigation .ae-nav-item.nav-collapsable-btn ', function () {
        var ele = $(this);
        $('body').toggleClass('no-scroll');
        //If Site Navigation is Mega Menu then the entire navigation should be collapsed
        if (ele.closest('.site-navigation').hasClass('mega-menu')) {
            ele.closest('.site-navigation').toggleClass('show');
            $('.bg-overlay').toggleClass('show');
        } else {
            ele.closest('.site-navigation').toggleClass('show');

            //Add/remove bg-overlay as per the need
            if ($('.site-navigation').hasClass('expand-second-level')) {
                $('.bg-overlay').addClass('show');
            } else if ($('.site-navigation').hasClass('show')) {
                $('.bg-overlay').addClass('show');
            } else {
                $('.bg-overlay').removeClass('show');
            }
        }
    });

}
//END: Site Navigation Menu functions on tablet view


//START: Overflow Menu
function overflowMenu() {
    var ele, scrollPos;
    $(document).on('click', '.overflow-menu-link', function () {
        ele = $(this);
        $('.overflow-menu-wrapper').not(ele.closest('.overflow-menu-wrapper')).removeClass('show');
        ele.closest('.overflow-menu-wrapper').toggleClass('show');
        ele.attr('aria-expanded', 'false');
        ele.closest('.overflow-menu-wrapper').find(".overflow-list-item").removeClass('expand');
        if (ele.closest('.overflow-menu-wrapper').hasClass('show')) {
            ele.attr('aria-expanded', 'true');
        } else {
            ele.closest('.overflow-menu-wrapper').find('.overflow-menu-link').attr('aria-expanded', 'false');
        }
        return false;
    });
    $(document).on('click', '.overflow-list-link', function () {
        ele = $(this);
        scrollPos = $('html').scrollTop();
        ele.closest('.overflow-menu-wrapper').find('.overflow-list-item').removeClass('active');
        ele.closest('.overflow-menu-wrapper').find('.overflow-list-item').addClass('active');
        if (ele.closest(".overflow-list-item").hasClass('sub-menu')) {
            ele.closest('.overflow-menu-wrapper').find(".overflow-list-item").removeClass('expand');
            ele.closest(".overflow-list-item").toggleClass('expand');
            $('html').animate({
                scrollTop: scrollPos
            }, 900);

        } else {
            ele.closest('.overflow-menu-wrapper').removeClass('show');
            ele.closest('.overflow-menu-wrapper').find(".overflow-list-item").removeClass('expand');
            ele.closest('.overflow-menu-wrapper').find('.overflow-menu-link').attr('aria-expanded', 'false');
        }
        return false;
    });
    // START: Notification-wrapper
    $(document).on('click', '.notification-wrapper .overflow-list-item', function () {
        var ele = $(this);
        if (ele.hasClass('unread')) {
            ele.find('.sr-only').addClass('hide');
            ele.removeClass('unread');
        }
        ele.closest('.overflow-menu-wrapper').addClass('show');
        return false;
    });
    $(document).on('click', '.notification-wrapper .overflow-list-item .cancel-icon', function () {
        ele = $(this);
        ele.closest('.overflow-list-item').remove();
        ele.closest('.overflow-menu-wrapper').addClass('show');
        return false;
    });
}
//END: Overflow Menu

//START: Form Error Handelling
function frormErrorControl() {
    var ele;
    $(document).on('click', '.form-control', function () {                                                                
        ele = $(this);
        ele.closest('.form-group').removeClass('error');
        hideError();
    });
}
//END: Form Error Handelling

//START: Preview and Edit
function savePreviewSection() {
    var ele, selector;
    $(document).on('click', '.form-with-preview .submit-btn', function () {
        ele = $(this);
        selector = ele.closest('.form-with-preview');
        selector.addClass('preview-mode');
        selector.find('.form-group').addClass('readonly');
        selector.find('.form-group .form-control').attr('readonly', 'readonly');
        //Showing the selected one in switch
        $('.form-group.toggle-switch').each(function () {
            if ($(this).find('input[type=checkbox]').prop('checked') == true) {
                $(this).find('.ae-toggle-switch-block').prev().hide();
            } else {
                $(this).find('.ae-toggle-switch-block').next().hide();
            }
        });
        ele.closest('.ae-action-wrapper').addClass('hide');
        $('.form-with-preview .edit-btn').removeClass('hide');
    });
}

function editPreviewSection() {
    var ele, selector;
    $(document).on('click', '.form-with-preview .edit-btn', function () {
        ele = $(this);
        ele.addClass('hide');
        selector = ele.closest('.form-with-preview');
        selector.removeClass('preview-mode');
        selector.find('.form-group').removeClass('readonly');
        selector.find('.form-group .form-control').removeAttr('readonly');
        //Showing the selected one in switch
        $('.form-group.toggle-switch').each(function () {
            $(this).find('.ae-toggle-label').show();
        });
        selector.closest('.ae-card').find('.ft .ae-action-wrapper').removeClass('hide');

        // Changing from non-editable mode to editable mode 👇
        selector.find('.form-group').removeClass('non-editable');
    });
}
//End: Preview and Edit

//START: Close elements on click of outside of the element
function closeOnGenericClick() {
    var formEle;
    $(document).on('click', 'body', function (e) {
        ele = $(e.target);
        closeItems(ele);
    });
    $(document).click(function (e) {
        $(".site-navigation .ae-nav-item").removeClass('show');
        // if (!$(e.target).closest('.overflow-menu-wrapper').is('.notification-wrapper,.link-wrapper')) {
        //     if ($(".overflow-menu-wrapper").hasClass('show')) {
        //         $(".overflow-menu-wrapper").removeClass('show')
        //     }
        // }

        if ($(".skip-content").hasClass('show')) {
            $(".skip-content").removeClass('show');
        }
        if (!$(e.target).closest('.dropdown-item').is('.search-item')) {
            if ($('.btn-menu-wrapper').hasClass('show')) {
                $('.btn-menu-wrapper').removeClass('show');
            }
        }

    });
    //Closing modal on click on bg overlay
    $(document).on('click', '.bg-overlay', function () {
        closeModal();
        closeSiteNavigation();
        $('body').removeClass('no-scroll');
    });

    //Keyboard Functions
    $(document).keyup(function (e) {
        if (e.keyCode === 27) {//Esec
            closeModal();
            if ($('.dropdow').hasClass('show') || $('.calendar-wrapper').hasClass('show') || $('.overflow-menu-wrapper').hasClass('show')) {
                $('.dropdown').removeClass('show');
                $('.dropdown .form-control, .form-group[type=autosuggest] .form-control').val('');

                $('.calendar-wrapper').removeClass('show');
                $('.date-input').removeClass('open-from-top');
            }
        }
    });
}

/*START: Cose Site Navigation*/
function closeSiteNavigation() {
    if ($('.site-navigation ').hasClass('show')) {
        $('.site-navigation ').removeClass('show');
    }
    $('.nav.site-navigation').removeClass('expand-second-level');
}
/*END: Cose Site Navigation*/


/*START: Close elements on click of outside of the element*/
function closeItems(ele) {
    if (ele.closest('.form-group').length) {
        var formEle = ele.parents('.form-group');
        $('.form-group').not(formEle).find('.dropdown-menu').removeClass('show');
        $('.dropdown').find('.ae-dropdown-item').removeClass('key-hover');
        $('.form-group').not(formEle).find('.md-datePicker').hide();
        $('.form-group').not(formEle).removeClass('show');
        // $('.dropdown .form-control, .form-group[type=autosuggest] .form-control').val('');

    } else {
        $('.dropdown, .lookup, .form-group').removeClass('show');
        $('.dropdown .form-control').attr('aria-expanded', false).removeAttr("aria-activedescendant");
        $('.dropdown').find('.dropdown-item').removeClass('key-hover expand');
        $('.dropdown').find('.dropdown-item.sub-menu').attr('aria-expanded', false);
        $('.dropdown').find('.ae-dropdown-item').removeClass('key-hover');
        // if(!$(formEle).find('.dropdown-item.selected').length){
        //   $('.dropdown .form-control, .form-group[type=autosuggest] .form-control').val('');      
        // }

        $('.splitbutton').removeClass('show');
        $('.form-group .md-datePicker').removeClass('show');
        $('.form-group.date-input .form-group').removeClass('show');
        $('.form-group.date-input').removeClass('show');
        $('.ae-global-search-wrapper').removeClass('show-result');
        $('.ae-global-search-wrapper').find('.ae-accordion-wrapper').removeClass('is-expanded');
        $('.ae-global-search-wrapper').find('.ae-accordion-wrapper .accordion-action-panel').attr('aria-expanded', false);
        $('.ae-global-search-wrapper').find('.ae-input-result-wrapper .ae-action-wrapper').removeClass('show');
        $('.ae-global-search-wrapper .ae-input-section').find('.form-control').attr('aria-expanded', false);
        $('.date-input').removeClass('open-from-top');
    }
}
/*END: Close elements on click of outside of the element*/





//START:Global Search
function globalSearch() {
    var ele, txtValue, tagLength, resultLength;

    //Open Result Section
    $(document).on('click', '.form-group:not(.ae-global-search-option2) .ae-input-section .form-control', function () {
        ele = $(this);
        ele.closest('.ae-global-search-wrapper').removeClass('show');
        ele.closest('.ae-global-search-wrapper').find('.form-control').attr('aria-expanded', false);
        ele.closest('.ae-global-search-wrapper').toggleClass('show-result');
        if (ele.closest('.ae-global-search-wrapper').hasClass('show-result')) {
            ele.attr('aria-expanded', true);
            ele.closest('.ae-input-result-wrapper').find('.ae-action-wrapper').removeClass('show');
        } else {
            ele.attr('aria-expanded', false);
            ele.closest('.ae-input-result-wrapper').find('.ae-action-wrapper').removeClass('show');
            ele.closest('.ae-input-result-wrapper').find('.ae-accordion-wrapper').removeClass('is-expanded');
            ele.closest('.ae-input-result-wrapper').find('.ae-accordion-wrapper .accordion-action-panel').attr('aria-expanded', false);
        }
    });

    //Match Result Section
    $(document).on('input', '.ae-global-search-wrapper:not(.ae-global-search-option2) .ae-input-section .form-control', function () {
        ele = $(this);
        ele.closest('.ae-global-search-wrapper').addClass('show-result');
        ele.attr('aria-expanded', true);
        txtValue = ele.val();
        if (txtValue.length == 0) {
            ele.closest('.ae-global-search-wrapper').find('.ae-input-result-wrapper .ae-recent-view-wrapper').show();
            ele.closest('.ae-global-search-wrapper').find('.ae-input-result-wrapper .ae-matching-wrapper').hide();
        } else {
            ele.closest('.ae-global-search-wrapper').find('.ae-input-result-wrapper .ae-recent-view-wrapper').hide();
            ele.closest('.ae-global-search-wrapper').find('.ae-input-result-wrapper .ae-matching-wrapper').show();
            if (txtValue !== "1") {
                ele.closest('.ae-global-search-wrapper').find('.ae-input-result-wrapper .ae-matching-wrapper').addClass('match-founded');
            } else {
                ele.closest('.ae-global-search-wrapper').find('.ae-input-result-wrapper .ae-matching-wrapper').removeClass('match-founded');
            }
        }
    });

    //Close search result
    $(document).on('click', '.ae-global-search-wrapper .dropdown-heading, .ae-global-search-wrapper .ae-profile-card', function () {
        ele = $(this);
        ele.closest('.ae-global-search-wrapper').removeClass('show-result');
        ele.closest('.ae-global-search-wrapper').find('.ae-accordion-wrapper').removeClass('is-expanded');
        ele.find('.ae-accordion-wrapper .accordion-action-panel').attr('aria-expanded', false);
        ele.closest('.ae-global-search-wrapper').find('.ae-input-section .form-control').attr('aria-expanded', false);
    });

    //Search Option 2 -- Search icon Click Event
    $(document).on('click', '.ae-global-search-option2 .global-search', function () {
        ele = $(this);
        ele.closest('.ae-global-search-wrapper').removeClass('show');
        ele.closest('.ae-global-search-wrapper').find('.form-control').attr('aria-expanded', false);
        txtValue = ele.closest('.searcher').find('.form-control').val();
        tagLength = ele.closest('.ae-global-search-wrapper').find('.ae-input-section .chip-wrapper .chip').length;
        if (txtValue.length == 0 && tagLength == 0) {
            ele.closest('.ae-global-search-wrapper').addClass('error');
            ele.closest('.ae-input-section').find('.form-control').attr("aria-invalid", "true");
            ele.closest('.ae-input-section').find('.form-control').focus();
            return;
        }
        if (!txtValue.length == 0) {
            ele.closest('.form-group').removeClass('error');
            ele.closest('.ae-input-section').find('.form-control').attr("aria-invalid", false);
            ele.closest('.ae-input-section').find('.form-control').attr('aria-expanded', true);
            ele.closest('.ae-global-search-wrapper').find('.searcher .chip-wrapper').append('<div class="chip has-action" tabindex="0" title="' + txtValue + '"><span class="text-value">' + txtValue + '</span><i class="icon cancel-icon black-icon" title="close" aria-label="press delete to remove"></i></div>');
            ele.closest('.ae-global-search-wrapper').find('.searcher .form-control').val("");
            resultLength = ele.closest('.ae-global-search-wrapper').find('.ae-profile-card-wrapper .ae-profile-card').length;
            if (resultLength === 0) {
                ele.closest('.ae-global-search-wrapper').find('.ae-matching-wrapper').removeClass('match-founded');
            } else {
                ele.closest('.ae-global-search-wrapper').find('.ae-profile-card-result .result-count').text('(' + resultLength + ')');
                ele.closest('.ae-global-search-wrapper').find('.ae-matching-wrapper').addClass('match-founded');
                ele.closest('.ae-global-search-wrapper').addClass('show-result');

            }
        } else if (!tagLength == 0) {
            ele.closest('.ae-global-search-wrapper').addClass('show-result');
            ele.closest('.ae-input-section').find('.form-control').attr('aria-expanded', true);
        }
    });

    $(document).on('keyup', '.ae-global-search-wrapper .ae-input-result-wrapper', function (e) {
        ele = $(this);
        if (e.which === 13) { //enter key
            e.preventDefault();
            if (ele.closest('.ae-global-search-option2').length) {
                if ($(e.target).hasClass('ae-profile-card')) {
                    $(e.target).trigger('click');
                    return;
                } else if ($(e.target).hasClass('global-search') || $(e.target).hasClass('form-control')) {
                    ele.find('.global-search').trigger('click');
                }
            } else {
                if ($(e.target).hasClass('form-control')) {
                    $(e.target).trigger('click');
                }
            }
        } else if (e.which === 27) { //esc key
            e.preventDefault();
            ele.closest('.ae-global-search-wrapper').removeClass('show-result');
            ele.find('.ae-accordion-wrapper').removeClass('is-expanded');
            ele.find('.ae-accordion-wrapper .accordion-action-panel').attr('aria-expanded', false);
            ele.closest('.ae-global-search-wrapper:not(.ae-global-search-option2)').find('.ae-input-section .form-control').focus();
            ele.closest('.ae-global-search-wrapper:not(.ae-global-search-option2)').find('.ae-input-section .form-control').attr('aria-expanded', false);
            ele.find('.ae-action-wrapper').removeClass('show');
        }
    });
    $(document).on('mouseleave', '.ae-global-search-wrapper .list-group-item', function () {
        ele = $(this);
        ele.find('.ae-action-wrapper').removeClass('show');
    });
    $(document).on('focusin', '.ae-global-search-wrapper .list-group-item', function () {
        ele = $(this);
        ele.closest('.ae-input-result-wrapper').find('.ae-action-wrapper').removeClass('show');
        ele.find('.ae-action-wrapper').addClass('show');
    });
    $(document).on('focusout', '.ae-global-search-wrapper .list-group-item .btn:last-child', function () {
        ele = $(this);
        ele.closest('.ae-action-wrapper').removeClass('show');
    });

    $(document).on('keydown', '.ae-global-search-wrapper .ae-input-result-wrapper .ae-advance-search .btn:last-child,.ae-global-search-wrapper .ae-input-result-wrapper .ae-profile-card:last-child', function (e) {
        if (e.which === 9 && !(e.shiftKey)) {
            ele = $(this);
            ele.closest('.ae-global-search-wrapper').removeClass('show-result');
            ele.closest('.ae-input-result-wrapper').find('.ae-accordion-wrapper').removeClass('is-expanded');
            ele.closest('.ae-input-result-wrapper').find('.ae-accordion-wrapper .accordion-action-panel').attr('aria-expanded', false);
            ele.closest('.ae-input-result-wrapper').find('.ae-input-section .form-control').attr('aria-expanded', false);
            ele.closest('.ae-input-result-wrapper').find('.ae-action-wrapper').removeClass('show');
        }
    });

    $(document).on('click', '.ae-global-search-wrapper .ae-advance-search .btn', function () {
        $(this).closest('.ae-global-search-wrapper').removeClass('show-result');
    });
}
//End:Global Search


//START: Tag
//Removing tag when click on the cross inside the tag
function tag() {
    var ele, chipLabel, chipText, chipCount, chipListCount;
    $(document).on('click', '.ae-table-filter .chip.has-action .cancel-icon', function () {
        ele = $(this).closest('.chip.has-action');
        chipLabel = ele.closest('.chip-list').find('label').text();
        chipText = ele.find('em').text();
        chipCount = ele.closest('.chip-list').find('.chip-wrapper .chip').length;
        chipListCount = ele.closest('.chip-list-wrapper').find('.chip-list').length;
        popoverChipListCount = ele.closest('.chip-list-wrapper').find('.chip-list.show').length;
        // Adding total number of tags in the popover button
        var chipInPopover = ele.closest('.ae-table-wrapper').find('.chip-list-wrapper:not(.vertical-alignment) .chip-list:not(.hide) .chip').length;
        chipInPopover = chipInPopover - 1;
        ele.closest('.ae-table-wrapper').find('.ae-table-filter .popover-btn').html('(' + chipInPopover + ') more');
        if (ele.closest('.chip-list-wrapper').hasClass('popover-content')) { //Chip inside popover
            if (chipCount <= 1) { //Last Chip in popover
                if (popoverChipListCount <= 1) { //Last Chip list in popover
                    ele.closest('.ae-table-wrapper').find('.ae-table-header-section .ae-table-filter').removeClass('show-popover');
                }
                ele.closest('.ae-table-filter').find('.popover-content .filter-' + chipLabel + '').remove();
            }
        } else {
            if (chipCount <= 1) { //Last Chip
                if (chipListCount <= 1) { //Last Chip list
                    ele.closest('.ae-table-wrapper').find('.ae-table-header-section').removeClass('show-filter');
                }
                ele.closest('.ae-table-wrapper').find('table thead th').each(function () {
                    getHeaderField = $(this).attr('data-field');
                    if (chipLabel == getHeaderField) {
                        $(this).find('.filter-control input').val('').trigger('keyup');
                    }
                });
                ele.closest('.ae-table-filter').find('.chip-list-wrapper .filter-' + chipLabel + '').remove();
            }
        }
        ele.remove();
    })
}
//END: Tag



// START: Floater
function floater() {
    dragModal();
    minimizeModal();
}
// END: Floater

// START: Dragging Functionality
function dragModal() {
    var ele, modalTop, modalLeft;
    $(document).on('mousedown', '.floater .modal-header', function () {
        ele = $(this);
        ele.closest('.ae-modal').draggable({
            containment: "window",
            handle: ".modal-header"
        });
        modalTop = ele.closest('.floater').position().top;
        modalLeft = ele.closest('.floater').offset().left;
        ele.closest('.floater').css({
            "top": modalTop,
            "left": modalLeft
        });;
        ele.closest('.floater').addClass('draggable');
    });
}
// END: Dragging Functionality

// START: Minimizing Floater
function minimizeModal() {
    var ele;
    $(document).on('click', '.floater .min-max', function () {
        ele = $(this);
        ele.closest('.ae-modal').toggleClass('modal-minimize');
        if (ele.closest('.ae-modal').hasClass('modal-minimize')) {
            ele.addClass('maximize');
        } else {
            ele.removeClass('maximize');
        }

    });
}
// END: Minimizing Floater


// START : INPUT DROPDOWN v2
function inputDropdown2() {
    // On-focus via tab both input box is highlighted
    $(document).on('focus', '.input-dropdown-v2 .dropdown-heading .form-control', function () {
        const ele = $(this);
        ele.closest('.input-dropdown-v2').addClass('selected');
    })

    // Focus Changes to other input-box onces selection is done from Dropdown
    $(document).on('focusout', '.input-dropdown-v2 .dropdown-heading .form-control', function () {
        const ele = $(this);
        ele.closest('.input-dropdown-v2').removeClass('selected');
        //ele.closest('.input-dropdown-v2').find('.input .form-control').focus();
    })

    // If focused or clicked on Input-box, dropdown closes
    $(document).on('click', '.input-dropdown-v2 .input .form-control', function () {
        const ele = $(this);
        ele.closest('.input-dropdown-v2').find('.dropdown').removeClass('show');
    })
}


//START: Current Date and Time Function
function getCurrentDateTime() {
    var dt = new Date();
    var hours = dt.getHours();
    var minutes = dt.getMinutes();

    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes; //if minutes are in single digit appending 0 before it

    curDate = dt.getDate() + "/" + (dt.getMonth() + 1) + "/" + dt.getFullYear(); //currentdate
    curTime = hours + ':' + minutes + ' ' + ampm; // current time in 12hr format with am pm
    curTime24HrFormat = dt.getHours() + ':' + minutes; // current time in 24hr format
}
//END: Current Date and Time Function


//START: Error Strip Read more and Read less
function addReadMore() {
    //This limit you can set after how much characters you want to show Read More.
    var carLmt = 80;
    // Text to show when text is collapsed
    var readMoreTxt = " ... Read More";
    // Text to show when text is expanded
    var readLessTxt = " Read Less";


    //Traverse all selectors with this class and manupulate HTML part to show Read More
    $(".add-read-more").each(function () {
        if ($(this).find(".first-sec").length)
            return;

        var allstr = $(this).text();
        if (allstr.length > carLmt) {
            var firstSet = allstr.substring(0, carLmt);
            var secdHalf = allstr.substring(carLmt, allstr.length);
            var strtoadd = firstSet + "<span class='SecSec'>" + secdHalf + "</span><span class='readMore' tabindex='0' title='Click to Show More'>" + readMoreTxt + "</span><span class='readLess' tabindex='0' title='Click to Show Less'>" + readLessTxt + "</span>";
            $(this).html(strtoadd);
        }

    });
    //Read More and Read Less Click Event binding
    $(document).on('keydown', '.readMore,.readLess', function (e) {
        var ele;
        ele = $(this);
        if (e.which == 13) {
            e.preventDefault();
            ele.trigger('click');
        }
    });
    $(document).on("click", ".readMore,.readLess", function () {
        $(this).closest(".add-read-more").toggleClass("show-less-content show-more-content");
    });
}

$(function () {
    //Calling function after Page Load
    addReadMore();
});








//START: ariaInvalid checking
function ariaInvalid() {
    $('.form-group').each(function () {
        var ele = $(this);
        if (ele.hasClass('error')) {
            ele.find('.form-control').attr("aria-invalid", "true");
        } else {
            ele.find('.form-control').attr("aria-invalid", "false");
        }
    });
}
//END: ariaInvalid checking


//START: Functionality for Keyboard Accessibility
function keyboard() {
    var targetEle;
    $(document).on('keydown', function (e) {
        targetEle = $(e.target).attr('class');
        if (e.which === 8 || e.which === 46) { // Backspace or Delete Key. MAC has no specific delete button, it uses backspace as delete. So, we are giving both  the option
            if ((targetEle.indexOf('chip') > -1 || targetEle.indexOf('tag') > -1) && targetEle.indexOf('has-action') > -1) { // to remove tag or chip
                $(e.target).find('.cancel-icon').trigger('click');
            }
        }
    });
}
//END: Functionality for Keyboard Accessibility

//START: Chips
function chipsTags() {
    var ele;
    //Removing chip when click on the cross inside the chip
    $(document).on('click', '.chip.has-action .cancel-icon,.tag.has-action .cancel-icon', function () {
        ele = $(this);
        if(ele.closest('.input-with-tags')){
            ele.closest('.input-with-tags').removeClass('reached-max-length');
        }
        ele.closest('.has-action').remove();
        
    });

    //on click, toggle selected class on selectable chips 
    $(document).on('click', '.chip-wrapper.selectable .chip', function () {
        ele = $(this);
        ele.toggleClass('selected');
    });
}
//END: Chips






//Start: Textarea

function textarea() {
    var ele;
    $(document).on('input', '.form-group textarea.form-control', function () {
        var curLen, maxLen, charRemaining;
        ele = $(this);
        curLen = ele.val().length;
        maxLen = ele.attr('maxlength');
        if (curLen >= maxLen) {
            charRemaining = 0;
        } else {
            charRemaining = maxLen - curLen;
        }
        ele.closest('.form-group').find('.form-text').text(charRemaining + " characters remaining");
    });
}

//END: Textarea

//START: Expand Collapse
function expandCollapse() {
    var ele, changeableText;
    var changeableTextDict = {
        'Add': 'Hide',
        'Show': 'Hide',
        'Hide': 'Show',
        'More': 'Less',
        'Less': 'More'
    };

    $(document).on('click', '.expand-collapse-block .accordion-action-panel', function () {
        ele = $(this);
        changeableText = ele.find('.changeable-text').text();
        ele.find('.changeable-text').text(changeableTextDict[changeableText]);
        // Hideable Remarks
        if (ele.closest('.hideable-remarks:not(.is-expanded)').length && !ele.closest('.hideable-remarks').find('.textarea .form-control').val().trim().length) {
            ele.find('.changeable-text').text('Add');
        }
    });
}
//END: Expand Collapse





//START: Overflow Menu Key Functionality
$(document).on('keydown', '.overflow-menu-wrapper:not(.notification-wrapper)', function (e) {
    var ele = $(this);
    var totalItem, overflowItem, nestedItem;
    overflowItem = ele.find('.overflow-list .overflow-list-link:focus').parent('.overflow-list-item').index() + 1;
    totalItem = ele.closest('.overflow-menu-wrapper').find('.overflow-list .overflow-list-item:not(.sub-overflow-list-item)').length;
    overflowListIndex = ele.find('.overflow-list .overflow-list-link:focus').closest('.quicklink-list').index() + 1;
    totalOverflowList = ele.find('.quicklink-list').length;
    siblingsCount = ele.find('.overflow-list .overflow-list-link:focus').parent('.overflow-list-item').siblings().length;
    nestedItem = ele.closest('.overflow-menu-wrapper').find('.overflow-list .overflow-list-item.expand .sub-overflow-list-item').length;

    if (e.keyCode === 13) { //enter
        e.preventDefault();
        if (ele.closest('.overflow-menu-wrapper').find('.overflow-menu-link').is(":focus")) { // If button have focus
            ele.find('.overflow-menu-link').trigger('click');
        } else {
            ele.find('.overflow-list .overflow-list-item .overflow-list-link:focus').trigger('click');
        }
    }
    if (e.keyCode === 27) { //esc
        e.preventDefault();
        ele.attr('aria-expanded', false);
        ele.closest('.overflow-menu-wrapper').removeClass('show');
        ele.closest('.overflow-menu-wrapper').find('.overflow-menu-link').attr('aria-expanded', 'false');
    }

    if (e.keyCode === 40 || (e.keyCode === 39 && ele.hasClass('link-wrapper'))) { //Down and Right(for QuickLinks)
        e.preventDefault();
        overflowItem = overflowItem + 1;
        if (overflowItem == 1) { //no initial focus
            ele.find('.overflow-list-link').first().focus();
        } else if (overflowItem > totalItem || overflowItem > siblingsCount + 1) {
            if (ele.find('.overflow-list-link:focus').closest('.quicklink-list').next().length) {
                ele.find('.overflow-list-link:focus').closest('.quicklink-list').next().find('.overflow-list-item .overflow-list-link').first().focus();

            } else {
                // ele.closest('.overflow-menu-wrapper').find('.overflow-list .overflow-list-item:first-child .overflow-list-link').focus();
                ele.find('.overflow-list-link').first().focus();

            }

        } else if (overflowItem < 0) {
            ele.closest('.overflow-menu-wrapper').find('.overflow-list .overflow-list-item:first-child .overflow-list-link').focus();
        } else if (ele.find('.sub-menu .overflow-list-link:focus').parent('.overflow-list-item').hasClass('expand')) {
            ele.closest('.overflow-menu-wrapper').find('.expand .sub-overflow-list-item:first-child .overflow-list-link').focus();
        } else if (ele.find('.sub-menu .sub-overflow-list-item a').is(":focus")) {
            if (overflowItem > nestedItem) {
                if (overflowItem < totalItem) {
                    ele.closest('.overflow-menu-wrapper').find('.overflow-list .overflow-list-item:nth-child(' + overflowItem + ') .overflow-list-link').focus();
                }
            } else {
                ele.closest('.overflow-menu-wrapper').find('.overflow-list .sub-overflow-list-item:nth-child(' + overflowItem + ') .overflow-list-link').focus();
            }
        } else {
            ele.find('.overflow-list-link:focus').parent('.overflow-list-item').next().find('.overflow-list-link').focus();
        }

    } else if (e.keyCode === 38 || (e.keyCode === 37 && ele.hasClass('link-wrapper'))) { //Up And Left(for QuickLinks)
        e.preventDefault();
        overflowItem = overflowItem - 1;
        if (overflowItem == 0) {
            if (ele.find('.overflow-list-link:focus').closest('.quicklink-list').prev().length) {
                ele.find('.overflow-list-link:focus').closest('.quicklink-list').prev().find('.overflow-list-item .overflow-list-link').last().focus();

            } else {
                ele.find('.overflow-list-link').last().focus();

            }

        } else {
            ele.find('.overflow-list-link:focus').parent('.overflow-list-item').prev().find('.overflow-list-link').focus();
        }
    }

});
//END: Overflow Menu Key Functionality

//START: Generate Profile list based on selection
function generateProfileSelection(ele, selectedDropdownItem){
    var eleIndex= ele.index()+1;
    var selectedProfileCount=1;
    var selectedProfileArr=[];
    var initialSelectedProfileCount=  $('.profile-application-selection-wrapper .ae-nav.selected-profile-list .ae-nav-tab').length;
    if(initialSelectedProfileCount==0){
        $('.profile-application-selection-wrapper .ae-nav.selected-profile-list').append(
            '<li class="ae-nav-tab" aria-describedby="'+selectedDropdownItem +'"' 
            + 'aria-controls="eleIndex-details" role="tab" aria-selected="false" tabindex="-1">'
            +'<span class="nav-link" id="'+selectedDropdownItem+'">'+selectedDropdownItem+'</span></li>');

            $('.profile-application-selection-wrapper .heading-wrapper').html('<h3 class="container-heading small-font-size">Selected Profile</h3>'
            +'<div class="right-side-wrapper">'
                +'<div class="chip" title="Chip 1" tabindex="0">'
                    +'<span class="text-value"><em class="completed-app-selection">'+selectedProfileCount+'</em>/<em>'+selectedProfileCount+'</em> completed</span>'
                +'</div>'
            +'</div>');
    }
    else{
        for(var i=0; i<initialSelectedProfileCount; i++){
            var itemVal=$('.profile-application-selection-wrapper .ae-nav.selected-profile-list .ae-nav-tab:nth-child('+(i+1)+') span').text();
            selectedProfileArr.push(itemVal);
        }
        if(selectedProfileArr.indexOf(selectedDropdownItem)<0){
            $('.profile-application-selection-wrapper .ae-nav.selected-profile-list').append(
                '<li class="ae-nav-tab" aria-describedby="'+selectedDropdownItem +'"' 
                + 'aria-controls="eleIndex-details" role="tab" aria-selected="false" tabindex="-1">'
                +'<span class="nav-link" id="'+selectedDropdownItem+'">'+selectedDropdownItem+'</span></li>');
                $('.profile-application-selection-wrapper .heading-wrapper').html('<h3 class="container-heading small-font-size">Selected Profile</h3>'
            +'<div class="right-side-wrapper">'
                +'<div class="chip" title="Chip 1" tabindex="0">'
                    +'<span class="text-value"><em class="completed-app-selection">'+((selectedProfileArr.length)+1)+'</em>/<em>'+((selectedProfileArr.length)+1)+'</em> completed</span>'
                +'</div>'
            +'</div>');
            }
        }
}


//START: Generate Profile list based on selection

// START: Edite Form On Need
function editFormOnNeed(){
    $(document).on('click','.editabe-form-on-need .edit-btn', function(){
        var ele=$(this);
        ele.addClass('disabled');
        ele.closest('.editabe-form-on-need').addClass('edit-mode');
        ele.closest('.editabe-form-on-need').find('.form-group.readonly').each(function(){
            $(this).removeClass('readonly');
            $(this).find('.form-control').removeAttr('readonly');
        })
    });
   //Cancel Mode
    $(document).on('click','.editabe-form-on-need .cancel-btn', function(){
        var ele1=$(this);
        ele1.closest('.editabe-form-on-need').find('.form-group').each(function(){
            $(this).addClass('readonly');
            $(this).find('.form-control').attr('readonly','readonly');
        });
        ele.closest('.editabe-form-on-need').removeClass('edit-mode');
        ele.closest('.editabe-form-on-need').find('.edit-btn').removeClass('disabled');

    });
}

// END: Edite Form On Need

//START: Edit Status
function editStatus(){
    $(document).on('click','.ae-nav-item .edit-status', function(){
        var ele=$(this);
        ele.closest('.ae-nav-item').find('.status-change-wrapper').addClass('show');
        ele.addClass('disabled');
    });
    $(document).on('click','.status-change-wrapper .cancel-btn, .status-change-wrapper .save-btn', function(){
        var ele=$(this);
        ele.closest('.status-change-wrapper').removeClass('show');
        ele.closest('.ae-nav-item').find('.btn.edit-status').removeClass('disabled');
    });
    
}
//EDN: Edit Status

//START: Guided Help
function guidedHelp(){
    var guideMsg=['Select the particular claim','Click on edit status','Change the status from the dropdown add comment and save'];
    console.log(guideMsg.length);
    var ele, msgCount=1;
    $(document).on('click','.ae-notification.guided-help .btn.next-gide', function(){
        ele=$(this);
       
        if(msgCount< guideMsg.length){
            ele.closest('.ae-notification.guided-help').find('.para em').html('Step:'+((msgCount+1)));
            ele.closest('.ae-notification.guided-help').find('.para span').text(guideMsg[msgCount]);
            if((msgCount+1)==guideMsg.length){
                ele.closest('.ae-notification.guided-help').addClass('completed');
                msgCount=1;
            }
        }
        msgCount++;    
    });

    $(document).on('click','.ae-notification.guided-help .btn.complete-gide', function(){
        ele=$(this);
        ele.closest('.ae-notification.guided-help').removeClass('show completed');
        ele.closest('.ae-notification.guided-help').find('.para em').html('Step: 1');
            ele.closest('.ae-notification.guided-help').find('.para span').text(guideMsg[0]);
    });
    
}
//END: Guided Help

//START: Tree Structure Tab Funcationlaity
function treeViewWithTab(){
    var ele, eleName;
 $(document).on('click', '.ae-nav-wrapper .tree-list .list-group-item:not(.sub-list)', function(){
    ele=$(this);
    eleName=ele.attr('name');
    ele.closest('.ae-nav-wrapper').find('.ae-nav-item').removeClass('selected');
    ele.closest('.ae-nav-wrapper').find('.ae-nav-item[id="'+eleName+'"]').addClass('selected');

    // $('.myclass[reference="12345"]')
 });
}
//END: Tree Structure Tab Funcationlaity


//START: Quick Help 
function quickHelp(){
    var ele, eletext;
    $(document).on('click','.message-block:not(.notes) .help-option-item .btn', function(){
      ele=$(this);
      ele.closest('.list-group-item').next('.user-input').addClass('show');
      ele.closest('.list-group-item').find('.help-option-item .btn').addClass('disabled');
      setTimeout(function(){
        ele.closest('.list-group').find('.list-group-item.user-input.show').next('.list-group-item').addClass('show');
      },600)
    });
}
//END: Quick Help

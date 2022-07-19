import { AnimeFilters } from '@js-camp/core/interfaces/filter';
import { AnimeType } from '@js-camp/core/models/anime/animeType';
import { AnimeFilterType } from '@js-camp/core/enums/anime/filters';
import { AnimeFilterValue } from '@js-camp/core/types/anime/filters';

interface FilterPanelProps {

  /** Update filters method. */
  readonly updateMethod: (filters: AnimeFilters) => void;
}

/** Filter Panel. */
export class FilterPanel {
  private root?: HTMLDivElement;

  private filterMenu?: HTMLDivElement;

  private filterForms?: HTMLDivElement;

  private isOpen: boolean;

  private updateMethod: (filters: AnimeFilters) => void;

  private filters: Filter[] = [
    {
      filterType: AnimeFilterType.Type,
      title: 'Anime type',
      filterFields: [
        {
          fieldTitle: 'Ova',
          fieldValue: AnimeType.OVA,
        },
        {
          fieldTitle: 'Movie',
          fieldValue: AnimeType.Movie,
        },
        {
          fieldTitle: 'Music',
          fieldValue: AnimeType.Music,
        },
        {
          fieldTitle: 'TV',
          fieldValue: AnimeType.TV,
        },
        {
          fieldTitle: 'ONA',
          fieldValue: AnimeType.ONA,
        },
        {
          fieldTitle: 'Special',
          fieldValue: AnimeType.Special,
        },
      ],
    },
  ];

  private toggleFilterMenu(): void {
    if (this.filterMenu === undefined) {
      throw new Error('Filter menu is not installed');
    }

    this.isOpen = !this.isOpen;

    if (!this.isOpen) {
      this.filterMenu.innerHTML = '';
      return void 0;
    }

    if (this.filterForms) {
      this.filterMenu.append(this.filterForms);
    }
  }

  private getActualButtonText(): string {
    return this.isOpen ? 'Hide filter menu' : 'Show filter menu';
  }

  public constructor({ updateMethod }: FilterPanelProps) {

    this.isOpen = false;
    this.updateMethod = updateMethod;
  }

  /** Get filter panel in html element format. */
  public getElement(): HTMLDivElement {
    if (this.root === undefined) {
      throw new Error('Filter panel is not initialized');
    }

    return this.root;
  }

  /** Initialize the filter panel component. */
  public initializeFilterPanel(): void {
    this.root = document.createElement('div');
    this.root.classList.add('flex', 'flex-col', 'justify-center', 'a');

    const toggleMenuButton = document.createElement('button');
    toggleMenuButton.textContent = this.getActualButtonText();
    toggleMenuButton.classList.add('border', 'rounded-xl', 'p-1', 'm-1');
    toggleMenuButton.addEventListener('click', () => {
      this.toggleFilterMenu();
      toggleMenuButton.textContent = this.getActualButtonText();
    });

    this.filterMenu = document.createElement('div');

    this.filterForms = document.createElement('div');
    this.filterForms.classList.add('w-full', 'border', 'rounded-xl', 'p-1');

    const submitButton = document.createElement('button');
    submitButton.classList.add('w-20', 'border', 'rounded-xl', 'hover:bg-slate-200', 'active:bg-slate-300');
    submitButton.textContent = 'Apply';
    submitButton.type = 'button';

    this.filters.forEach(filter => {
      const filterForm = createFilterForm(filter);

      submitButton.addEventListener('click', e => {
        e.preventDefault();
        const filters: AnimeFilters = {
          [AnimeFilterType.Type]: [],
        };
        filter.filterFields.forEach(field => {
          const fieldEl = filterForm.elements.namedItem(field.fieldTitle) as HTMLInputElement;
          if (fieldEl.checked === true) {
            const filterType = filter.filterType as AnimeFilterType;
            filters[filterType].push(field.fieldValue);
          }
        });

        this.updateMethod(filters);
      });

      this.filterForms?.append(filterForm);
    });

    this.filterForms.append(submitButton);

    if (this.isOpen) {
      this.filterMenu.append(this.filterForms);
    }

    this.root.append(toggleMenuButton, this.filterMenu);
  }
}

/** Filter. */
interface Filter {

  /** Filter Type. */
  filterType: AnimeFilterType;

  /** Filter title. */
  title: string;

  /** Filter params. */
  filterFields: {

    /** Filter value. */
    fieldValue: AnimeFilterValue;

    /** Filter title. */
    fieldTitle: string;
  }[];
}

/**
 * Create Filter Form.
 * @param filter Filter.
 */
function createFilterForm(filter: Filter): HTMLFormElement {
  const form = document.createElement('form');
  form.classList.add('flex', 'flex-col', 'w-40', 'rounded-xl', 'border', 'mb-1', 'mr-1', 'p-1');

  const title = document.createElement('span');
  title.classList.add('border-b-2', 'border-orange-100', 'font-semibold');
  title.textContent = filter.title;
  form.append(title);

  filter.filterFields.forEach(field => {
    const label = document.createElement('label');
    label.classList.add('hover:bg-slate-200', 'rounded-xl', 'px-1', 'pl-2', 'my-[1px]');

    const fieldTitle = document.createElement('span');
    fieldTitle.textContent = field.fieldTitle;

    const checkbox = document.createElement('input');
    checkbox.name = field.fieldTitle;
    checkbox.type = 'checkbox';
    checkbox.setAttribute('data-filter', filter.filterType);
    checkbox.classList.add('mr-1', 'border-4');

    label.append(checkbox, fieldTitle);
    form.append(label);
  });

  return form;
}

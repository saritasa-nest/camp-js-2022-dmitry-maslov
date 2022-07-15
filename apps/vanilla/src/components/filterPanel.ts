import { AnimeFilters } from '@js-camp/core/interfaces/filter';
import { AnimeType } from '@js-camp/core/enums/anime/type';
import { AnimeFilter } from '@js-camp/core/types/anime/filters';

interface FilterPanelProps {

  /** Update filters method. */
  readonly updateMethod: (filters: AnimeFilters) => void;

  /** Filter params. */
  readonly filters: AnimeFilters;
}

/** Filter Panel. */
export class FilterPanel {
  private root?: HTMLDivElement;

  private filterMenu?: HTMLDivElement;

  private filterForms?: HTMLDivElement;

  private isOpen: boolean;

  private filterParams: AnimeFilters;

  private updateMethod: (filters: AnimeFilters) => void;

  private filters: Filter[] = [
    {

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
    return this.isOpen ? 'Close filter menu' : 'Open filter menu';
  }

  public constructor({ filters, updateMethod }: FilterPanelProps) {
    this.filterParams = filters;

    this.isOpen = false;
    this.updateMethod = updateMethod;
  }

  public updateFilterPanel(): void {

  }

  public getElement(): HTMLDivElement {
    if (this.root === undefined) {
      throw new Error('Filter panel is not initialized');
    }

    return this.root;
  }

  /** Initialize the filter panel component. */
  public initializeFilterPanel(): void {
    this.root = document.createElement('div');
    this.root.classList.add('flex', 'flex-col', 'justify-center');

    const toggleMenuButton = document.createElement('button');
    toggleMenuButton.textContent = this.getActualButtonText();
    toggleMenuButton.classList.add('block', 'border', 'rounded-xl', 'p-1', 'm-1');
    toggleMenuButton.addEventListener('click', () => {
      this.toggleFilterMenu();
      toggleMenuButton.textContent = this.getActualButtonText();
    });

    this.filterMenu = document.createElement('div');

    this.filterForms = document.createElement('div');
    this.filterForms.classList.add('w-10/12', 'border');

    this.filters.forEach(filter => {
      const filterForm = createFilterForm(filter);

      filterForm.addEventListener('submit', e => {
        e.preventDefault();
        const filters: AnimeFilters = {
          type: [],
        };
        filter.filterFields.forEach(field => {
          const fieldEl = filterForm.elements.namedItem(field.fieldTitle) as HTMLInputElement;
          if (fieldEl.checked === true) {
            filters.push(field.fieldValue);
          }
        });

        this.updateMethod(filters);
      });

      this.filterForms?.append(filterForm);
    });

    if (this.isOpen) {
      this.filterMenu.append(this.filterForms);
    }

    const title = document.createElement('span');
    title.textContent = 'Add filters';

    this.root.append(title, toggleMenuButton, this.filterMenu);
  }
}

/** Filter. */
interface Filter {

  /** Filter title. */
  title: string;

  /** Filter params. */
  filterFields: {

    /** Filter value. */
    fieldValue: AnimeFilter ;

    /** Filter title. */
    fieldTitle: string;
  }[];
}

function createFilterForm(filter: Filter): HTMLFormElement {
  const form = document.createElement('form');
  form.classList.add('flex', 'flex-col');

  const title = document.createElement('span');
  title.textContent = filter.title;
  form.append(title);

  filter.filterFields.forEach(field => {
    const label = document.createElement('label');
    label.textContent = field.fieldTitle;

    const checkbox = document.createElement('input');
    checkbox.name = field.fieldTitle;
    checkbox.type = 'checkbox';

    label.append(checkbox);
    form.append(label);
  });

  const submitButton = document.createElement('button');
  submitButton.textContent = 'Submit';

  form.append(submitButton);

  return form;
}

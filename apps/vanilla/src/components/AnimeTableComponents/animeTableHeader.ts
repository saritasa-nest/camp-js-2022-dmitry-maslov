import { Dom, $ } from '../../core/Dom';

/**
 * Created table headers, is responsible for sorting.
 */
export function $createAnimeTableHeader(): Dom {
  const $root = $.create('thead');

  /**
   * Mount the component on the root element.
   */
  function mount(): void {
    $root.append(
    );
  }

  mount();
  return $root;
}

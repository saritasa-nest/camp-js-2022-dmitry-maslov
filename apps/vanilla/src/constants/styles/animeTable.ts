
export namespace paginationStyles {
  export const button = ['w-12', 'border', 'disabled:opacity-50'];
  export const activeButton = ['bg-slate-300'];
  export const noButton = ['w-8', 'text-center'];
}

export namespace headerStyles {
  export const sortedHeader = ['cursor-pointer'];
}

export namespace elementStyles {
  export const image = ['w-40'];

  export const col = ['border-r', 'w-40'];
}

export namespace tableStyles {
  export const tableClass = ['flex', 'flex-col', 'w-full', 'items-center'];
  export const tbody = ['flex', 'flex-col', 'w-11/12'];
  export const thead = ['flex', 'w-11/12'];
  export const row = ['flex', 'border-y', 'my-1', 'w-full', 'justify-between'];
  export const imageCol = ['w-40', 'text-center'];
}

export namespace filtersStyles {
  export const filtersWrapper = ['flex', 'flex-col', 'w-11/12', 'pt-1', 'm-auto'];
  export const searchFilter = ['border', 'rounded', 'focus:outline-none', 'focus:border-sky-500', 'px-3', 'py-1'];
}

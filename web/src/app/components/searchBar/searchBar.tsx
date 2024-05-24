'use client';
import './searchBar.scss';

import { useRef } from 'react';
import { useRouter } from 'next/navigation';
// import { useData } from '../context/context';

function SearchBar() {
    const searchBarRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    // const { setData } = useData();

    function handleOnClick(e: any) {
        const searchInput: any =
            searchBarRef?.current?.querySelector('.searchInput');
        searchInput.value = '';

        if (document.activeElement === searchInput) {
            searchInput?.blur();
        }
    }

    function handleOnKeyDown(e: any) {
        if (e.key === 'Enter') {
            router.push(`/pages/search/${e.target.value}`);
            // setData(e.target.value);
        }
    }

    return (
        <div className="searchBar" ref={searchBarRef}>
            <input
                type="text"
                name="searchInput"
                id="searchInput"
                className="searchInput"
                placeholder="Search"
                onKeyDown={handleOnKeyDown}
            />
            <div className="btnClear" onClick={handleOnClick}></div>
        </div>
    );
}

export default SearchBar;

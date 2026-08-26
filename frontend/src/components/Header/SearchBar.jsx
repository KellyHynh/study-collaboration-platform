import { useState } from "react";
import bem from "../../utils/bem";
import Icon from "../Icon/Icon";
import "./SearchBar.scss";

const b = bem("search-bar");
function SearchBar() {
    const [keyword, setKeyword] = useState("");

    // Cập nhật giá trị khi người dùng nhập
    function handleSearchChange(event) {
        setKeyword(event.target.value);
    }

    // Xử lý khi người dùng thực hiện tìm kiếm
    function handleSearch(event) {
        event.preventDefault();

        console.log("Search keyword:", keyword);

        // Sau này:
        // - Gửi keyword lên HomePage
        // - Gọi API
        // - Hiển thị kết quả tìm kiếm
    }

    return (
        <form className={b()} onSubmit={handleSearch}>
            <input
                type="text"
                placeholder="Search courses or instructors..."
                value={keyword}
                onChange={handleSearchChange}
            />

            <button type="submit">
                <Icon
                    name="search"
                    size={20}
                    className={b("icon")}
                />
            </button>
        </form>
    );
}

export default SearchBar;
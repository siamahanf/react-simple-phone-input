import React from "react";

//Css
import "./PhoneInput.css";

//Helper function
import { getDefaultCountry, getBySearch, getCountryByFilter, CountryDataTypes } from "../../Helpers/country-helper";

//Custom Hook
import { useOnClickOutside } from "../../Helpers/hook";

//Country Data
import { countryData } from "../../Data/country-data";

//Data types
export interface PhoneInputResponseType {
    country: string;
    code: string;
    dialCode: string;
    value: string;
    valueWithoutPlus: string;
}

//Props Types
interface Props {
    placeholder: string;
    country: string;
    onChange: (e: PhoneInputResponseType) => void;
    value?: string;
    iconComponent?: React.ReactNode;
    inputProps?: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
    onlyCountries?: string[];
    excludeCountries?: string[];
    preferredCountries?: string[];
    showDropdownIcon?: boolean;
    dialCodeInputField?: boolean;
    disableDropdownOnly?: boolean;
    disableInput?: boolean;
    search?: boolean;
    searchPlaceholder?: string;
    showSearchIcon?: boolean;
    searchIconComponent?: React.ReactNode;
    searchProps?: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
    searchNotFound?: string;
    //Class
    containerClass?: string;
    buttonClass?: string;
    dropdownClass?: string;
    dropdownListClass?: string;
    dropdownIconClass?: string;
    searchContainerClass?: string;
    searchInputClass?: string;
    searchIconClass?: string;
    inputClass?: string;
    //Styles
    containerStyle?: React.CSSProperties;
    buttonStyle?: React.CSSProperties;
    dropdownStyle?: React.CSSProperties;
    dropdownListStyle?: React.CSSProperties;
    dropdownIconStyle?: React.CSSProperties;
    searchContainerStyle?: React.CSSProperties;
    searchInputStyle?: React.CSSProperties;
    searchIconStyle?: React.CSSProperties;
    inputStyle?: React.CSSProperties;
}
//Selected types
interface SelectedTypes {
    country: string;
    callingCode: string;
    countryCode: string;
}

//Component
const PhoneInput = ({ placeholder, country, onChange, value, iconComponent, inputProps, onlyCountries, excludeCountries, preferredCountries, showDropdownIcon = true, dialCodeInputField = false, search = true, disableDropdownOnly = false, disableInput = false, searchPlaceholder = "Search country", showSearchIcon = true, searchIconComponent, searchProps, searchNotFound = "Not found", containerClass, buttonClass, dropdownClass, dropdownListClass, dropdownIconClass, searchContainerClass, searchInputClass, searchIconClass, inputClass, containerStyle, buttonStyle, dropdownStyle, dropdownListStyle, dropdownIconStyle, searchContainerStyle, searchInputStyle, searchIconStyle, inputStyle }: Props) => {
    //State
    const [selected, setSelected] = React.useState<SelectedTypes>({} as SelectedTypes);
    const [isDropdown, setDropdown] = React.useState<boolean>(false);
    const [inputValue, setInputValue] = React.useState<string>(value as string || "");
    const [countryDataInfo, setCountryData] = React.useState<CountryDataTypes[]>(countryData);
    const [cursor, setCursor] = React.useState<number>(0);
    //Ref
    const dropdownRef = React.useRef<HTMLDivElement | null>(null);
    const listRef = React.useRef<HTMLUListElement | null>(null);
    //Custom Hook Call
    useOnClickOutside(dropdownRef, () => setDropdown(false));
    //Handler
    //---Input Onchange Handler//
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const onlyNumber = e.target.value.replace(/\D/g, '')
        if (dialCodeInputField) {
            onChange({
                country: selected.country,
                code: selected.countryCode,
                dialCode: selected.callingCode,
                value: "+" + onlyNumber,
                valueWithoutPlus: onlyNumber
            })
            setInputValue("+" + onlyNumber)
        } else {
            setInputValue(onlyNumber)
            onChange({
                country: selected.country,
                code: selected.countryCode,
                dialCode: selected.callingCode,
                value: selected.callingCode + onlyNumber,
                valueWithoutPlus: selected.callingCode.replace("+", "") + onlyNumber
            })
        }
    }
    //---On Dropdown Handler//
    const onDropdownHandler = () => {
        if (!disableDropdownOnly) {
            setDropdown(!isDropdown)
        }
    }
    //---Search Input Onchange Handler//
    const onSearchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const search = e.target.value;
        setCountryData(getBySearch(search, onlyCountries, excludeCountries))
    }
    //---Set Selected Handler//
    const handleSelected = (item: SelectedTypes, i: number) => {
        if (dialCodeInputField) {
            const result = inputValue?.replace(selected.callingCode, item.callingCode)
            setInputValue(result.length > 0 ? result : item.callingCode);
            onChange({
                country: item.country,
                code: item.countryCode,
                dialCode: item.callingCode,
                value: result.length > 0 ? result : item.callingCode,
                valueWithoutPlus: result.length > 0 ? result.replace("+", "") : item.callingCode.replace("+", "")
            })
        } else {
            onChange({
                country: item.country,
                code: item.countryCode,
                dialCode: item.callingCode,
                value: item.callingCode + inputValue,
                valueWithoutPlus: item.callingCode.replace("+", "") + inputValue
            })
        }
        setSelected(item);
        setDropdown(false);
        setCursor(i)
    }
    //---Scroll To View Handler//
    const scrollIntoView = (position: number) => {
        if (search) {
            if (countryDataInfo.length > 0) {
                listRef.current?.scrollTo({
                    top: position,
                    behavior: "smooth"
                })
            }
        }
    };
    //---Keyboard Navigation//
    const keyBoardNav = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (isDropdown) {
            if (e.key === "ArrowDown") {
                e.preventDefault();
                setCursor(c => (c < countryDataInfo.length - 1 ? c + 1 : c))
            }
            if (e.key === "ArrowUp") {
                e.preventDefault();
                setCursor(c => (c > 0 ? c - 1 : 0))
            }
            if (e.key === "Escape") {
                setDropdown(false);
            }
            if (e.key === "Enter" && cursor >= 0) {
                setSelected(countryDataInfo[cursor]);
                setDropdown(false)
            }
        }
    }
    //React Hook
    //---Scroll to view hook//
    React.useEffect(() => {
        if (cursor < 0 || cursor > countryDataInfo.length || !listRef) {
            return () => {
            };
        }
        if (isDropdown && listRef) {
            if (countryDataInfo.length > 0) {
                let listItems = Array.from(listRef.current?.children as HTMLCollection) as HTMLElement[];
                listItems[cursor] && scrollIntoView(listItems[cursor].offsetTop - 65);
            }
        }
    }, [cursor]);
    //---Dial Code Field Effect//
    React.useMemo(() => {
        if (dialCodeInputField) {
            const result = inputValue?.replace(selected.callingCode, (getDefaultCountry(country) as SelectedTypes).callingCode);
            console.log(result)
            setInputValue(result.length > 0 ? result : (getDefaultCountry(country) as SelectedTypes).callingCode);
        }
        setSelected(getDefaultCountry(country) as SelectedTypes)
    }, [country, dialCodeInputField])
    //---Country search hook//
    React.useMemo(() => {
        setCountryData(getCountryByFilter(onlyCountries as string[], excludeCountries as string[], preferredCountries as string[]))
    }, [onlyCountries, excludeCountries, preferredCountries])
    return (
        <div className={`simple-phone-input-sri198-container${containerClass ? " " + containerClass : ""}`} onKeyDown={(e) => keyBoardNav(e)} tabIndex={-1} style={containerStyle}>
            <div className="simple-phone-input-sri198-main">
                <div className="simple-phone-input-sri198-dropdown-container" ref={dropdownRef}>
                    <div onClick={onDropdownHandler} className={dialCodeInputField ? `simple-phone-input-sri198-dropdown-container-button dial${buttonClass ? " " + buttonClass : ""}` : `simple-phone-input-sri198-dropdown-container-button${buttonClass ? " " + buttonClass : ""}`} style={buttonStyle}>
                        <img src={"https://cdn.jsdelivr.net/gh/siamahnaf198/country-flags@main/img/" + selected.countryCode + ".svg"} alt={selected.country} width="20px" />
                        {!dialCodeInputField &&
                            <span className="simple-phone-input-sri198-selected-code">{selected.callingCode}</span>
                        }
                        {showDropdownIcon && !disableDropdownOnly &&
                            <div className={isDropdown ? `simple-phone-input-sri198-dropdown-icon${dropdownIconClass ? " " + dropdownIconClass : ""}` : `simple-phone-input-sri198-dropdown-icon active${dropdownIconClass ? " " + dropdownIconClass : ""}`} style={dropdownIconStyle}>
                                {iconComponent ? iconComponent : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="m7 10l5 5l5-5z" /></svg>
                                )}
                            </div>
                        }
                    </div>
                    <ul className={isDropdown ? `simple-phone-input-sri198-dropdown active${dropdownClass ? " " + dropdownClass : ""}` : `simple-phone-input-sri198-dropdown${dropdownClass ? " " + dropdownClass : ""}`} ref={listRef} style={dropdownStyle}>
                        {search &&
                            <div className={`simple-phone-input-sri198-search-container${searchContainerClass ? " " + searchContainerClass : ""}`} style={searchContainerStyle}>
                                <input
                                    placeholder={searchPlaceholder}
                                    {...searchProps}
                                    onChange={onSearchHandler}
                                    className={searchInputClass ?? ""}
                                    style={searchInputStyle}
                                />
                                {showSearchIcon &&
                                    <div className={`simple-phone-input-sri198-search-icon${searchIconClass ? " " + searchIconClass : ""}`} style={searchIconStyle}>
                                        {searchIconComponent ?? (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 48 48"><g fill="#616161"><path d="m29.175 31.99l2.828-2.827l12.019 12.019l-2.828 2.827z" /><circle cx="20" cy="20" r="16" /></g><path fill="#37474F" d="m32.45 35.34l2.827-2.828l8.696 8.696l-2.828 2.828z" /><circle cx="20" cy="20" r="13" fill="#64B5F6" /><path fill="#BBDEFB" d="M26.9 14.2c-1.7-2-4.2-3.2-6.9-3.2s-5.2 1.2-6.9 3.2c-.4.4-.3 1.1.1 1.4c.4.4 1.1.3 1.4-.1C16 13.9 17.9 13 20 13s4 .9 5.4 2.5c.2.2.5.4.8.4c.2 0 .5-.1.6-.2c.4-.4.4-1.1.1-1.5z" /></svg>
                                        )}

                                    </div>
                                }
                            </div>
                        }
                        {countryDataInfo.length === 0 &&
                            <div className="simple-phone-input-sri198-not-found">
                                {searchNotFound}
                            </div>
                        }
                        {countryDataInfo.map((item, i) => (
                            <li key={i} onClick={() => handleSelected(item, i)} className={i === cursor ? `active${dropdownListClass ? " " + dropdownListClass : ""}` : `${dropdownListClass ? " " + dropdownListClass : ""}`} style={dropdownListStyle}>
                                <img src={"https://cdn.jsdelivr.net/gh/siamahnaf198/country-flags@main/img/" + item.countryCode + ".svg"} alt={item.country} width="20px" />
                                <span className="simple-phone-input-sri198-dropdown-text">{item.country}</span>
                                <span className="simple-phone-input-sri198-dropdown-country-code">{item.callingCode}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <input
                    className={`simple-phone-input-sri198-input ${inputClass ? " " + inputClass : ""}`}
                    placeholder={placeholder}
                    onChange={handleChange}
                    type="tel"
                    onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                        if (dialCodeInputField) {
                            const oldVal = inputValue.slice(selected.callingCode.length)
                            if (e.target.value.startsWith(selected.callingCode)) {
                                e.target.value = e.target.value
                            } else {
                                e.target.value = selected.callingCode + oldVal
                            }
                        }
                    }}
                    onKeyDown={(e) => keyBoardNav(e)}
                    value={inputValue}
                    {...inputProps}
                    style={inputStyle}
                    disabled={disableInput}
                />
            </div>
        </div>
    );
};
export default PhoneInput;
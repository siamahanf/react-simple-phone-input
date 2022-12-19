React Simple Phone Input
==========

A simple and customizable react phone number dropdown component. It can mixed up with your designed theme and give a fluent vibeable dropdown area in your next project.

[![npm version](https://cdn.jsdelivr.net/gh/siamahnaf198/react-simple-phone-input@main/assets/npm-version.svg)](https://www.npmjs.com/package/react-simple-phone-input)
[![npm downloads](https://cdn.jsdelivr.net/gh/siamahnaf198/react-simple-phone-input@main/assets/downloads.svg)](https://www.npmjs.com/package/react-simple-phone-input)
[![PRs Welcome](https://cdn.jsdelivr.net/gh/siamahnaf198/react-simple-phone-input@main/assets/prs-welcome.svg)](https://github.com/siamahnaf198/react-simple-phone-input)
[![MIT licensed](https://cdn.jsdelivr.net/gh/siamahnaf198/react-simple-phone-input@main/assets/license.svg)](https://github.com/siamahnaf198/react-simple-phone-input/blob/main/LICENSE)

## Installation

```shell-script
$ npm i react-simple-phone-input --save
```

## Installation

```jsx
import { PhoneInput } from "react-simple-phone-input";
import "react-simple-phone-input/dist/cjs/index.css";

<PhoneInput
    country="US"
    placeholder="Add your phone"
    onChange={(data) => console.log(data)}
/>
```
#### [See Demo](https://react-simple-phone-input.vercel.app/)

## Options
<table width="100%">
  <tr>
    <th> Name </th>
    <th> Type </th>
    <th width="30%"> Description </th>
    <th> Is Required </th>
    <th> Example </th>
  </tr>
  <tr>
    <td> country </td>
    <td> string </td>
    <td> initial country </td>
    <td> required </td>
    <td> "BD" </td>
  </tr>
   <tr>
    <td> placeholder </td>
    <td> string </td>
    <td> Input Field Placeholder Text </td>
    <td> required </td>
    <td> <code>Type your phone number</code> </td>
  </tr>
  <tr>
    <td> value </td>
    <td> string </td>
    <td> Input field state value or default value </td>
    <td> optional </td>
    <td></td>
  </tr>
  
  <tr>
    <td> iconComponent </td>
    <td> ReactNode </td>
    <td> Dropdown Icon component for changing default icon </td>
    <td> optional </td>
    <td><code> &lt;Icon icon=&quot;icon-name&quot; /&gt; </cpde></td>
  </tr>
  
   <tr>
    <td> inputProps </td>
    <td> InputHTMLAttributes </td>
    <td> Props to pass into the input field </td>
    <td> optional </td>
    <td> </td>
  </tr>

  <tr>
    <td> onlyCountries </td>
    <td> array </td>
    <td> Show only country in dropdown menu with Country Codes </td>
    <td> optional </td>
    <td> ["BD", "US", "AF", "AL"] </td>
  </tr>
  
  <tr>
    <td> excludeCountries </td>
    <td> array </td>
    <td> If you want to remove some country to the list. If you give <code>excludeCountries</code> then <code>onlyCountries</code> not works </td>
    <td> optional </td>
    <td> ["AF", "AL"] </td>
  </tr>
  
  <tr>
    <td> preferredCountries </td>
    <td> array </td>
    <td> Country codes to show on the top of the dropdown menu </td>
    <td> optional </td>
    <td> ["BD", "US"] </td>
  </tr>

  <tr>
    <td> searchPlaceholder </td>
    <td> string </td>
    <td> Search input field placeholder </td>
    <td>optional</td>
    <td></td>
  </tr>

  <tr>
    <td> searchIconComponent </td>
    <td> ReactNode </td>
    <td> If <code>search</code> enabled, custom search icon to show on search bar </td>
    <td> optional </td>
    <td><code> &lt;Icon icon=&quot;icon-name&quot; /&gt; </cpde></td>
  </tr>
  
  <tr>
    <td> searchProps </td>
    <td> InputHTMLAttributes </td>
    <td> Props to pass into the search input field </td>
    <td> optional </td>
    <td> </td>
  </tr>
  
  <tr>
    <td> searchNotFound </td>
    <td> string </td>
    <td> Error message when search result is empty! </td>
    <td> optional </td>
    <td> </td>
  </tr>
</table>

## Other Options

<table>
  <tr>
    <th> Name </th>
    <th> Default </th>
    <th> Description </th>
  </tr>
  <tr>
    <td> showDropdownIcon </td>
    <td> true </td>
    <td> Show or Hide dropdown icon </td>
  </tr>
  <tr>
    <td> dialCodeInputField </td>
    <td> false </td>
    <td> Show calling code into into field or show beside country flag. For more, see <a href="https://react-simple-phone-input.vercel.app/">example</a> </td>
  </tr>
  <tr>
    <td> search </td>
    <td> true </td>
    <td> Show or Hide search input field </td>
  </tr>
  <tr>
    <td> showSearchIcon </td>
    <td> true </td>
    <td> Show or Hide search icon </td>
  </tr>
</table>

## Event

<table>
  <tr>
    <th> Event Name </th>
    <th> Description </th>
    <th> Example </th>
  </tr>
  <tr>
    <td> onChange </td>
    <td> To get the value from component </td>
    <td> <code>onChange={(data: string) => console.log(data)}</code> </td>
  </tr>
</table>

## Contributing
- Code style changes not allowed
- Do not create issues about incorrect or missing country data

## Issues or correction
If you face any issues, missing data or wrong data about country, you are welcome to create an issue.

## Stay in touch

- Author - [Siam Ahnaf](https://www.siamahnaf.com/)
- Website - [https://www.siamahnaf.com/](https://www.siamahnaf.com/)
- Twitter - [https://twitter.com/siamahnaf198](https://twitter.com/siamahnaf198)
- Github - [https://github.com/siamahnaf198](https://github.com/siamahnaf198)

## License

[![MIT licensed](https://cdn.jsdelivr.net/gh/siamahnaf198/react-simple-phone-input@main/assets/license.svg)](LICENSE)
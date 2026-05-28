# @veert00x/react-alerts

A React component library for displaying alerts and notifications in a user-friendly manner. 
It provides customizable alert components that can be easily integrated into any React application.

## Features
- Customizable alert types (success, error, warning, info)
- Support for auto-dismissal of alerts
- Flexible styling options
- Easy integration with React applications

## Installation
* You can install the library from npm using the following command:

```bash
npm install @veert00x/react-alerts
```

* You can install the library from github using the following command:

```bash
npm install github:veert00x/react-alerts#main
```

## Usage
* To use the alert components, wrap your application with the `AlertProvider` and use the
`useAlertBox` hook to trigger alerts.

```jsx
import React from "react";
import { AlertProvider, useAlertBox } from "@veert00x/react-alerts";

return (
    <AlertProvider>
        <App />
    </AlertProvider>
);
```

```jsx
import React from "react";
import { useAlertBox } from "@veert00x/react-alerts";

const MyComponent = () => {
    const { showAlert } = useAlertBox();

    const handleClick = () => {
        showAlert("This is a success message!", "success", 3000);
    };

    return <button onClick={handleClick}>Show Alert</button>;
};
```
## Customization

**You can customize the appearance of the alerts by modifying the CSS classes. 
The components classes are as follows:**

- `overlay-veert00x-react-alert` - The overlay that covers the screen when an alert is displayed.
- `box-veert00x-react-alert alert-box ${type}` - The alert box that contains the message and timer.

## Contributing
Contributions are welcome! Please feel free to submit issues and pull requests to improve the library.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details
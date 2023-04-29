# Common (Shared Module)

## Components
HeaderComponent: Displays the header with navigation links (Dashboard, Contacts, Map, and Admin, if applicable), logo, user information (if logged in), language selector, and dark mode toggle.

FooterComponent: Displays the footer with copyright information, social media links, and other relevant information.

Services:

AuthService: Handles user authentication, login, logout, role management, and user information storage. Responsible for communicating with the Authentication API.

Methods: login(email, password), logout(), isAuthenticated(), getUserRole(), getUserInfo()

AuthGuard: Protects routes based on user authentication and role. Can be applied to route configurations.
Methods: canActivate(route, state)
ThemeService: Manages the application theme, such as dark mode and light mode.
Methods: toggleTheme(), getTheme()
LanguageService: Handles internationalization (i18n) and manages the user's language preferences.
Methods: setLanguage(lang), getLanguage()
# CoreModule

Services:
WeatherAlertService: Manages CRUD operations for weather alerts. Responsible for communicating with the Weather Alert API.
Methods: getAllAlerts(), getAlertById(id), createAlert(alert), updateAlert(id, updatedAlert), deleteAlert(id)
ContactService: Manages CRUD operations for contacts. Responsible for communicating with the Contact API.
Methods: getAllContacts(), getContactById(id), createContact(contact), updateContact(id, updatedContact), deleteContact(id)
MapService: Provides map-related functionality, such as displaying weather alerts and contacts on the map, toggling their visibility, and handling geolocation.
Methods: displayAlertsOnMap(alerts), displayContactsOnMap(contacts), toggleAlertsVisibility(), toggleContactsVisibility(), getUserLocation()
WeatherDataService: Fetches real-time weather data and forecasts using a weather data API.
Methods: getCurrentWeather(location), getWeatherForecast(location)
NotificationService: Manages push notifications for weather alerts and updates.
Methods: requestPermission(), subscribeToNotifications(), sendNotification(data)
OfflineStorageService: Handles caching of data and resources for offline support using service workers or other storage solutions.
Methods: saveData(key, data), loadData(key), clearData(key)
AnalyticsService: Tracks user engagement and provides insights based on user activity.
Methods: trackEvent(event), getUserInsights()

# LoginModule (Feature Module)

## Components
LoginComponent: Provides a login form for users, allowing them to enter their email and password. On successful authentication, the user is redirected to the Dashboard. Emits an event on successful login to update the HeaderComponent.
Fields: email, password
Events: loginSuccess
Included ## Components None
Routes:
{ path: 'login', component: LoginComponent }

# DashboardModule (Feature Module)

## Components
DashboardComponent: Displays the list of weather alerts, allowing users to add, edit, or delete alerts. Each alert item includes a link to open the WeatherAlertEditorComponent for editing. Emits an event when an alert is added or removed to update the MapComponent. Also, displays real-time weather updates and forecasts using the WeatherDataService.
Fields: alerts (array of alert objects), currentWeather, weatherForecast
Events: alertAdded, alertRemoved
Included Components: WeatherAlertEditorComponent
WeatherAlertEditorComponent: Provides a form for creating or editing weather alerts,


allowing users to enter a name, description, start and end dates, and location (chosen from a map or a list of cities or states). Outputs the created or updated alert. Supports sharing of weather alerts on social media platforms using the SocialSharingComponent.
- Fields: name, description, startDate, endDate, locationType (map or list), location (city or state)
- Outputs: alertSaved
- Included ## Components SocialSharingComponent
- SocialSharingComponent: Allows users to share weather alerts on social media platforms like Facebook, Twitter, or Instagram.
- Inputs: alertData
- Included ## Components None

Routing:
dashboard-routing.module.ts:
Routes:
{ path: 'dashboard', component: DashboardComponent }
{ path: 'dashboard/:id/edit', component: WeatherAlertEditorComponent }

# ContactModule (Feature Module)

## Components
ContactDashboardComponent: Manages user contacts, including people, fire departments, police, and emergency managers. Allows users to add, edit, or delete contacts. Each contact item includes a link to open the ContactEditorComponent for editing. Emits an event when a contact is added or removed to update the MapComponent.
Fields: contacts (array of contact objects)
Events: contactAdded, contactRemoved
Included ## Components ContactEditorComponent
ContactEditorComponent: Provides a form for creating or editing contacts, allowing users to enter contact details, such as name, phone number, email, address, and contact type. Outputs the created or updated contact. Also supports sharing of contact information on social media platforms using the SocialSharingComponent.
Fields: name, phoneNumber, email, address, contactType
Outputs: contactSaved
Included ## Components SocialSharingComponent
Routing:
contact-routing.module.ts:
Routes:
{ path: 'contacts', component: ContactDashboardComponent }
{ path: 'contacts/:id/edit', component: ContactEditorComponent }

# MapModule (Feature Module)

## Components
MapComponent: Displays a map with weather alerts and contacts based on user toggles. Listens for events from the DashboardComponent and ContactDashboardComponent to update the displayed alerts and contacts. Uses MapService to handle map-related functionality, including geolocation. Also supports offline access with cached data from the OfflineStorageService.
Fields: map, alertsLayer, contactsLayer, alertVisibility, contactVisibility
Inputs: alerts, contacts
Included ## Components None
Directives:
MapToggleDirective: Toggles the display of weather alerts and contacts on the map. Can be applied to buttons or other elements that trigger the toggling functionality.
Methods: toggleAlerts(), toggleContacts()

# AdminModule (Feature Module)

## Components
AdminComponent: Provides admin functionality, such as user management. Displays a list of users, allowing admins to add, edit, or delete users. Accessible only to users with the admin role. Uses AuthService to check user roles.
Fields: users (array of user objects)
Included ## Components None
Guards:
AdminGuard: Protects admin routes based on user role. Can be applied to route configurations. Uses AuthService to check user roles.
Methods: canActivate(route, state)
Routing:
admin-routing.module.ts:
Routes:
{ path: 'admin', component: AdminComponent, canActivate: [AuthGuard, AdminGuard] }

# AppRoutingModule (Root Routing Module)

Configures root routes and sets up lazy-loading for feature modules.
Routes:



{ path: '', redirectTo: '/dashboard', pathMatch: 'full' }
{ path: '**', redirectTo: '/dashboard', pathMatch: 'full' }

# UserPreferencesModule (Feature Module)

## Components
UserPreferencesComponent: Allows users to customize their experience by saving preferences and settings, such as default map zoom level, notification preferences, or preferred units for temperature and wind speed. Uses a form to gather user input and save the settings.
Fields: defaultMapZoom, notificationPreferences, temperatureUnits, windSpeedUnits
Included ## Components None
Services:
UserPreferencesService: Handles storage and retrieval of user preferences and settings.
Methods: savePreferences(preferences), getPreferences()
Routing:
user-preferences-routing.module.ts:
Routes:
{ path: 'preferences', component: UserPreferencesComponent }

# ReportingModule (Feature Module)

## Components
ReportingComponent: Allows users to submit their own weather observations or incident reports, which can be displayed on the map and help other users stay informed about local conditions. The form gathers user input, including location, description, and optional photos, and submits the report.
Fields: location, description, photos
Included ## Components None
Services:
ReportingService: Handles storage and retrieval of user-submitted weather observations and incident reports.
Methods: submitReport(report), getReports()
Routing:
reporting-routing.module.ts:
Routes:
{ path: 'report', component: ReportingComponent }



// before each test we want to visit the dashboard page
beforeEach(() => {
  cy.visit('/')
})



describe('The Dashboard Page', () => {
  it('displays current weather and weather forecast data', () => {
    cy.get('.current-weather').should('contain.text', 'Current Weather')
    cy.get('.weather-forecast').should('contain.text', 'Weather Forecast')
  })

  it('allows the user to create an alert', () => {
    createAlert('Test Alert', 'This is a test alert')

    cy.get('.alert-item').should('contain.text', 'Test Alert')
    cy.get('.alert-item').should('contain.text', 'This is a test alert')
  })

  it('allows the user to edit an alert', () => {
    // Add an alert for testing
    createAlert('Test Alert', 'This is a test alert')

    // Click the Edit button
    cy.get('button').contains('Edit').click()

    // Edit the alert information
    cy.get('#name').clear().type('Updated Test Alert')
    cy.get('#description').clear().type('This is an updated test alert')

    // Save the changes
    cy.get('button').contains('Save Alert').click()

    // Check if the updated alert is displayed
    cy.get('.alert-item').should('contain.text', 'Updated Test Alert')
    cy.get('.alert-item').should('contain.text', 'This is an updated test alert')
  })

  it('allows the user to create multiple alerts and delete one of them', () => {
    // Create two alerts
    createAlert('Test Alert 1', 'This is a test alert 1');
    createAlert('Test Alert 2', 'This is a test alert 2');

    // Check if both alerts are displayed
    cy.get('.alert-item').should('have.length', 2);

    // Delete the first alert
    cy.get('.alert-item').first().within(() => {
      cy.get('button').contains('Delete').click();
    });

    // Check if only one alert remains
    cy.get('.alert-item').should('have.length', 1);

    // Check if the remaining alert is the second one
    cy.get('.alert-item').should('contain.text', 'Test Alert 2');
    cy.get('.alert-item').should('contain.text', 'This is a test alert 2');
  });


})

function createAlert(name: string, description: string) {
  cy.get('.add-alert-button').click()
  cy.get('#name').type(name);
  cy.get('#description').type(description);
  cy.get('#startDate').type('2020-01-01');
  cy.get('#endDate').type('2020-01-02');
  cy.get('#locationType').select('Map');
  cy.get('#location').type('Test Location');
  cy.get('button').contains('Save Alert').click();
}



# ui.R

library(shiny)
data(state) ##gets the names of each state
ruralRoutes <- c("RR", "HC", "SR", "PSC", "RTE")



# this file has the html forms for street address, rural route, and po box

shinyUI(fluidPage(
  
  # The two tags below are used to interact with the Google Maps API and
  # to initialize the map on the form 
  tags$head(tags$script(src = "https://maps.googleapis.com/maps/api/js")),
  tags$head(tags$script(src = "initializeMap.js")),
 
  h1("Where did you live on July 1, 2014?"),
  h2("Please select the type of address associated with your location."),
  
  # Radio buttons for the three different address types
  radioButtons(inputId = "addressType", label = NULL, 
               choices = c("Street Address" = "street", "Rural Route"= "rr", "P.O. Box" = "pobox"), 
               selected = "street", inline = TRUE),
  
  # First and Last name boxes
  wellPanel(flowLayout(textInput(inputId = "firstName", label = "First Name:", value = ""),
                       textInput(inputId = "lastName", label = "Last Name:", value = ""))), 

  # Conditional panel for street address
  conditionalPanel( 
    condition = "input.addressType == 'street'",
    flowLayout(textInput(inputId = "houseNumber", label = "Address Number:", value = ""),
               textInput(inputId = "streetName", label = "Street Name:", value = ""),
               textInput(inputId = "aptNumber", label = "Apt/Unit:", value = ""),
               textInput(inputId = "addressCity", label = "City:", value = ""),
               selectInput(inputId = "addressState", label = "State:", 
                           choices = c("Select State", state.name), 
                           selected = NULL, multiple = FALSE, selectize = TRUE, 
                           width = NULL, size = NULL),
               textInput(inputId = "zipCodeState", label = "ZIP Code:", value = "")),
    tags$body(tags$input(type = "button", 
                         value = "Next", 
                         id = "button1", 
                         onClick = "geocodeAddressStreet(houseNumber,streetName,addressCity,addressState)"))),
  
  # Conditional panel for rural route
  conditionalPanel(
    condition = "input.addressType == 'rr'",
    flowLayout(selectInput(inputId = "descriptorRR", label="Rural Route Descriptor:", 
                           choices = c("Select Descriptor",ruralRoutes), selected = NULL, 
                           multiple = FALSE, selectize = TRUE, width = NULL, size = NULL),
               textInput(inputId = "routeNumber", label = "Rural Route #:", value = ""),
               textInput(inputId = "boxNumber", label = "Box #:", value = ""),
               textInput(inputId = "RRcity", label = "City:", value = ""),
               selectInput(inputId = "RRstate", label = "State:", 
                           choices = c("Select State", state.name), 
                           selected = NULL, multiple = FALSE, selectize = TRUE, 
                           width = NULL, size = NULL),
               textInput(inputId = "zipCodeRR", label = "ZIP Code:", value = "")),
    tags$body(tags$input(type = "button", 
                         value = "Next", 
                         id = "button2", 
                         onClick = "geocodeAddressRR(descriptorRR, routeNumber, boxNumber, RRcity, RRstate)"))),
   
  
    # Conditional panel for P.O. Box
    conditionalPanel(
    condition = "input.addressType == 'pobox'",
    flowLayout(textInput(inputId = "box", label = "P.O. Box #:", value = ""),
               textInput(inputId = "POcity", label = "City:", value = ""),
               selectInput(inputId = "POstate", label = "State:", 
                           choices = c("Select State", state.name), 
                           selected = NULL, multiple = FALSE, selectize = TRUE, 
                           width = NULL, size = NULL),
               textInput(inputId = "zipCodePO", label = "ZIP Code:", value = "")),
    tags$body(tags$input(type = "button", 
                         value = "Next", 
                         id = "button3", 
                         onClick = "geocodeAddressPO(POcity,POstate)"))),
  
  
  textOutput("concatenateAddress"),
  
  
  ##inserting the map on the screen 
  br(),
  tags$body(tags$div(id = "map-canvas", style = "width: 500px; height: 400px;"))
  
  
))


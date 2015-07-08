library(shiny)
address.var <- ''

shinyServer(function(input, output) {
  
  # This function concatenates the address and shows it on the screen above the map
  re <- eventReactive(input$submitAddress,{
    address.var <<- paste0(input$houseNumber," ", 
                          input$streetName, " ", 
                          input$aptNumber, " ",
                          input$addressCity, ", ",
                          input$addressState, ", ",
                          input$zipCode)})
  
  
  output$concatenateAddress <- renderText({re()})

})



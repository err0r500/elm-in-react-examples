port module Counter exposing (main)

import Html exposing (Html, text)


init : Model
init =
    { count = 0 }



-- PORTS


port incDecClicked : (Int -> a) -> Sub a


port countOut : Int -> Cmd a



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions _ =
    incDecClicked IncDec



-- MODEL


type alias Model =
    { count : Int }



-- UPDATE


type Msg
    = IncDec Int


update : Msg -> Model -> ( Model, Cmd msg )
update msg model =
    case msg of
        IncDec incrBy ->
            let
                newCount =
                    model.count + incrBy
            in
                ( { model | count = newCount }, countOut newCount )



-- MAIN


main : Program Never Model Msg
main =
    Html.program
        { init = ( init, Cmd.none )
        , view = \_ -> text ""
        , update = update
        , subscriptions = subscriptions
        }

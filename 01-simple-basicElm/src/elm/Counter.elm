port module Counter exposing (main)

import Html exposing (Html, text)


main : Program Never Model Msg
main =
    Html.program
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }


init : ( Model, Cmd Msg )
init =
    ( { count = 0 }, Cmd.none )



-- MODEL


type alias Model =
    { count : Int }



-- UPDATE


type Msg
    = IncDec Int


update : Msg -> Model -> ( Model, Cmd msg )
update msg model =
    case msg of
        IncDec by ->
            let
                newCount =
                    model.count + by
            in
                ( { model | count = newCount }, countOut newCount )



-- VIEW


view : Model -> Html Msg
view _ =
    text ""



-- PORTS


port incDecClicked : (Int -> msg) -> Sub msg


port countOut : Int -> Cmd msg



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions model =
    incDecClicked IncDec

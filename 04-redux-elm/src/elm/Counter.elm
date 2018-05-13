port module Counter exposing (main)

import Html exposing (Html, text)
import Json.Decode exposing (..)


main : Program Value Model Msg
main =
    Html.programWithFlags
        { init = init

        --        , view = view
        , update = update
        , subscriptions = subscriptions
        }


init : Value -> ( Model, Cmd Msg )
init flags =
    case Json.Decode.decodeValue flagsDecoder flags of
        Ok f ->
            ( { count = f.count }, Cmd.none )

        Err err ->
            Debug.log
                ("Error parsing flag, falling back to default value => " ++ err)
                ( { count = 1000 }, Cmd.none )


flagsDecoder : Json.Decode.Decoder Flags
flagsDecoder =
    Json.Decode.map Flags
        (field "count" int)


type alias Flags =
    { count : Int }



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

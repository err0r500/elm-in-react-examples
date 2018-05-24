port module Counter exposing (main)

{-| Simple headless counter
@docs main
-}

import Json.Decode exposing (..)


-- PORTS


port incDecClicked : (Int -> msg) -> Sub msg


port countOut : Int -> Cmd msg



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions model =
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
        IncDec by ->
            let
                newCount =
                    model.count + by
            in
                ( { model | count = newCount }, countOut newCount )



--INIT


type alias Flags =
    { count : Int }


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


{-| the simpleCounter
-}
main : Program Value Model Msg
main =
    Platform.programWithFlags
        { init = init
        , update = update
        , subscriptions = subscriptions
        }

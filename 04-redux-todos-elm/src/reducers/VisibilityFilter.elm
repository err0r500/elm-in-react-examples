port module VisibilityFilter exposing (main)

{-| Simple headless counter
@docs main
-}

import Redux
import Json.Encode exposing (Value)
import Json.Decode exposing (..)
import Debug exposing (..)


port setVisibilityFilter : (Json.Encode.Value -> msg) -> Sub msg



-- MODEL


type alias Model =
    FilterEnum


type FilterEnum
    = ShowAll
    | ShowCompleted
    | ShowActive


type alias ReduxModel =
    String



-- ACTIONS


type Msg
    = Noop
    | UpdateFilter String


ensureActionReceived : Json.Decode.Value -> Msg
ensureActionReceived payload =
    let
        decoder =
            Json.Decode.decodeValue Json.Decode.string
    in
        case decoder payload of
            Ok action ->
                UpdateFilter action

            Err err ->
                Debug.log ("Error parsing input, falling back to default value => " ++ toString payload ++ err)
                    Noop


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.batch [ setVisibilityFilter ensureActionReceived ]


reduxToModel : ReduxModel -> Model
reduxToModel reduxModel =
    case reduxModel of
        "SHOW_ALL" ->
            ShowAll

        "SHOW_COMPLETED" ->
            ShowCompleted

        "SHOW_ACTIVE" ->
            ShowActive

        _ ->
            ShowAll


modelToRedux : Model -> Json.Encode.Value
modelToRedux model =
    case model of
        ShowAll ->
            Json.Encode.string "SHOW_ALL"

        ShowCompleted ->
            Json.Encode.string "SHOW_COMPLETED"

        ShowActive ->
            Json.Encode.string "SHOW_ACTIVE"



-- UPDATE


update : Msg -> Model -> ( Model, Cmd Msg )
update action model =
    case action of
        UpdateFilter payload ->
            ( reduxToModel payload, Cmd.none )

        Noop ->
            ( model, Cmd.none )



-- init sets the initial state (with an eventual fallback)


init : Json.Decode.Value -> ( Model, Cmd Msg )
init initialStateFromJS =
    case Json.Decode.decodeValue Json.Decode.string initialStateFromJS of
        Ok f ->
            Debug.log ("initial => " ++ f)
                ( reduxToModel f, Cmd.none )

        Err err ->
            Debug.log ("Error parsing flag, falling back to default value => " ++ toString initialStateFromJS)
                ( ShowActive, Cmd.none )


{-| the simpleCounter
-}
main : Program Json.Decode.Value Model Msg
main =
    Redux.programWithFlags
        { init = init
        , update = update
        , encode = modelToRedux
        , subscriptions = subscriptions
        }

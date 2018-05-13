import React from 'react';

export const ElmContext = React.createContext({
    incDecHandler: function () {},
    count: 10,
});

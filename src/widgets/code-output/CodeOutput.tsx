import React, {FC} from 'react';
import parse from 'html-react-parser';
import {Box} from '@chakra-ui/react';
import './mocha.css';
const str = "<div id=\"mocha\"><ul id=\"mocha-stats\"><li class=\"progress\"><canvas width=\"40\" height=\"40\"></canvas></li><li class=\"passes\"><a href=\"#\">passes:</a> <em>1</em></li><li class=\"failures\"><a href=\"#\">failures:</a> <em>0</em></li><li class=\"duration\">duration: <em>0.01</em>s</li></ul><ul id=\"mocha-report\"><li class=\"suite\"><h1><a href=\"/%D0%9D%D0%BE%D0%B2%D0%B0%D1%8F%20%D0%BF%D0%B0%D0%BF%D0%BA%D0%B0/mocha-test/index.html?_ijt=v3q6b13mte5hfqofu6otaf8v1f&amp;_ij_reload=RELOAD_ON_SAVE&amp;grep=getCelcius\">getCelcius</a></h1><ul><li class=\"test pass fast\"><h2>should convert farenheit to celcius for all values in an array<span class=\"duration\">1ms</span> <a href=\"/%D0%9D%D0%BE%D0%B2%D0%B0%D1%8F%20%D0%BF%D0%B0%D0%BF%D0%BA%D0%B0/mocha-test/index.html?_ijt=v3q6b13mte5hfqofu6otaf8v1f&amp;_ij_reload=RELOAD_ON_SAVE&amp;grep=getCelcius%20should%20convert%20farenheit%20to%20celcius%20for%20all%20values%20in%20an%20array\" class=\"replay\">‣</a></h2><pre style=\"display: none;\"><code>expect(getCelcius([<span class=\"number\">23</span>, <span class=\"number\">140</span>, <span class=\"number\">212</span>, <span class=\"number\">41</span>])).to.deep.equal([-<span class=\"number\">5</span>, <span class=\"number\">60</span>, <span class=\"number\">100</span>, <span class=\"number\">5</span>])\n" +
    "expect(getCelcius([-<span class=\"number\">58</span>, -<span class=\"number\">22</span>, -<span class=\"number\">4</span>, <span class=\"number\">14</span>])).to.deep.equal([-<span class=\"number\">50</span>, -<span class=\"number\">30</span>, -<span class=\"number\">20</span>, -<span class=\"number\">10</span>])\n" +
    "expect(getCelcius([<span class=\"number\">104</span>, <span class=\"number\">122</span>, <span class=\"number\">158</span>, <span class=\"number\">176</span>])).to.deep.equal([<span class=\"number\">40</span>, <span class=\"number\">50</span>, <span class=\"number\">70</span>, <span class=\"number\">80</span>])</code></pre></li></ul></li></ul></div>"

export const CodeOutput:FC<{HTMLstring?: string}> = ({HTMLstring}) => {
    return (
        <Box border='2px solid grey' borderRadius='1rem' padding={2} height='100%'>
            {str ? parse(str) : 'Your results will be shown here.'}
        </Box>
    );
};


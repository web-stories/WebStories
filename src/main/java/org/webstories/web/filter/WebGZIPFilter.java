package org.webstories.web.filter;

import javax.servlet.annotation.WebFilter;

import com.fagnerbrack.servlet.gzip.GZIPFilter;

@WebFilter( filterName = "gzip" )
public class WebGZIPFilter extends GZIPFilter {}

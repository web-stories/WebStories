package org.webstories.core.date;

import java.text.SimpleDateFormat;

import org.joda.time.DateTime;

public class RelativeDate {
	private final long NOW = 0;
	private final long MINUTE_1 = 1000 * 60;
	private final long HOUR_1 = MINUTE_1 * 60;
	private final long DAY_1 = HOUR_1 * 24;
	private final long DAY_2 = DAY_1 * 2;
	private final long WEEK_1 = DAY_1 * 7;
	private final long WEEK_2 = WEEK_1 * 2;
	private final long MONTH_1 = WEEK_1 * 4;
	private final long MONTH_2 = MONTH_1 * 2;
	private final long YEAR_1 = MONTH_1 * 12;
	
	private DateTime start;
	private DateTime end;
	
	public RelativeDate from( long start ) {
		this.start = new DateTime( start );
		return this;
	}
	
	public RelativeDate until( long end ) {
		this.end = new DateTime( end );
		return this;
	}
	
	public String toRelativeString() {
		DateDiff diff = new DateDiff( getDiffInMillis() );
		
		if ( diff.isBetween( NOW, MINUTE_1 ) ) {
			return "Agora mesmo";
		} else if ( diff.isBetween( MINUTE_1, HOUR_1 ) ) {
			return "Alguns minutos atrás";
		} else if ( diff.isBetween( HOUR_1, DAY_1 ) ) {
			return "Algumas horas atrás";
		} else if ( diff.isBetween( DAY_1, DAY_2 ) ) {
			return "Um dia atrás";
		} else if ( diff.isBetween( DAY_2, WEEK_1 ) ) {
			return "Alguns dias atrás";
		} else if ( diff.isBetween( WEEK_1, WEEK_2 ) ) {
			return "Uma semana atrás";
		} else if ( diff.isBetween( WEEK_2, MONTH_1 ) ) {
			return "Algumas semanas atrás";
		} else if ( diff.isBetween( MONTH_1, MONTH_2 ) ) {
			return "Um mês atrás";
		} else if ( diff.isBetween( MONTH_2, YEAR_1 ) ) {
			return "Alguns meses atrás";
		}
		
		return new SimpleDateFormat( "dd/MM/yyyy" ).format( start.getMillis() );
	}
	
	private long getDiffInMillis() {
		if ( start == null ) {
			throw new RelativeDateException( "Missing 'start' value" );
		}
		
		if ( end == null ) {
			throw new RelativeDateException( "Missing 'end' value" );
		}
		
		return end.getMillis() - start.getMillis();
	}
	
	private class DateDiff {
		private long diff;
		public DateDiff( long diff ) {
			this.diff = diff;
		}
		public boolean isBetween( long start, long end ) {
			return diff >= start && diff <= end;
		}
	}
}
